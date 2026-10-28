/**
 * Eclipse awning viewer, ported from the supplied PWA Step 8/16 module.
 * Geometry, mesh exclusions, fabric mapping and shading are preserved.
 * This file has no framework, build-time package or CDN dependency.
 */
export type AwningModel = 'vollkassette' | 'halbkassette' | 'gelenkarm';
export type AwningViewerProps = {
  model: AwningModel;
  housingColor: string;
  fabricTexture: string;
  widthMm: number;
  projectionMm: number;
};
export type AwningViewerHandle = {
  update: (next: Partial<AwningViewerProps>) => void;
  resetView: () => void;
  destroy: () => void;
};

let nextViewerId = 0;

export function createAwningViewer(
  host: HTMLElement,
  initial: AwningViewerProps,
  assetBase: string,
): AwningViewerHandle {
  const props: AwningViewerProps = { ...initial };
  const stage = document.createElement('div');
  stage.className = 'eam-viewer-stage';
  stage.style.cssText = 'position:absolute;inset:0;overflow:hidden;background:#fff;';
  const canvas = document.createElement('canvas');
  canvas.className = 'eam-viewer-canvas';
  canvas.tabIndex = 0;
  canvas.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;touch-action:pan-y;';
  const status = document.createElement('div');
  status.className = 'eam-viewer-message';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  status.style.cssText = 'position:absolute;inset:0;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(255,255,255,.88);color:#52676c;z-index:4;text-align:center;pointer-events:none;';
  const controls = document.createElement('div');
  controls.className = 'eam-viewer-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', '3D-Ansicht steuern');
  controls.style.cssText = 'position:absolute;left:50%;bottom:62px;transform:translateX(-50%);z-index:6;display:flex;align-items:center;gap:5px;max-width:calc(100% - 24px);';
  const hint = document.createElement('div');
  hint.id = 'eam-viewer-help-' + (++nextViewerId);
  hint.className = 'eam-viewer-hint';
  hint.style.cssText = 'position:absolute;left:50%;bottom:104px;transform:translateX(-50%);z-index:3;max-width:calc(100% - 28px);width:max-content;text-align:center;font-size:11px;color:#607078;background:rgba(255,255,255,.8);padding:4px 8px;border-radius:8px;pointer-events:none;';
  canvas.setAttribute('aria-describedby', hint.id);
  stage.append(canvas, status, hint, controls);
  host.replaceChildren(stage);

  const listeners: Array<() => void> = [];
  let loading = false;
  let modelError = '';
  let textureError = '';
  let modelRequest = 0;
  let modelAbort: AbortController | null = null;
  let textureAbort: AbortController | null = null;
  let interactionEnabled = false;
  let activePointer: number | null = null;

  function listen(target: EventTarget, type: string, fn: EventListener, options?: AddEventListenerOptions) {
    target.addEventListener(type, fn, options);
    listeners.push(() => target.removeEventListener(type, fn, options));
  }
  function addButton(label: string, text: string, action: () => void) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'eam-viewer-control';
    button.textContent = text;
    button.title = label;
    button.setAttribute('aria-label', label);
    button.style.cssText = 'border:1px solid #cbd8de;border-radius:8px;background:rgba(255,255,255,.94);color:#005b81;padding:7px 11px;min-height:36px;min-width:36px;cursor:pointer;font:inherit;font-size:13px;line-height:1.2;';
    listen(button, 'click', action);
    controls.appendChild(button);
    return button;
  }
  addButton('3D-Ansicht verkleinern', '−', () => setZoom(zoom * 1.15));
  addButton('3D-Ansicht vergrößern', '+', () => setZoom(zoom / 1.15));
  addButton('3D-Ansicht zurücksetzen', '↺', resetView);
  const activateButton = addButton('3D-Bedienung aktivieren', '3D steuern', () => setInteraction(!interactionEnabled));
  activateButton.setAttribute('aria-pressed', 'false');
  const retryButton = addButton('3D-Vorschau erneut laden', 'Neu laden', () => {
    if (textureError && !modelError) {
      textureError = '';
      syncMessage();
      void loadFabricTexture();
    } else {
      void loadModel();
    }
  });
  retryButton.style.display = 'none';

  function setInteraction(enabled: boolean) {
    interactionEnabled = enabled;
    canvas.style.touchAction = enabled ? 'none' : 'pan-y';
    activateButton.setAttribute('aria-pressed', String(enabled));
    activateButton.setAttribute('aria-label', enabled ? '3D-Bedienung beenden und Seite scrollen' : '3D-Bedienung aktivieren');
    activateButton.textContent = enabled ? '3D beenden' : '3D steuern';
    hint.textContent = enabled
      ? 'Ziehen: drehen · Mausrad: zoomen · Esc: beenden'
      : 'Ziehen: drehen · Strg + Mausrad: zoomen · Mobil: „3D steuern“';
    if (!enabled) onPointerUp();
  }
  function syncMessage() {
    const message = modelError || textureError || (loading ? '3D-Modell wird geladen …' : '');
    status.textContent = message;
    status.style.display = message ? 'flex' : 'none';
    status.style.color = modelError || textureError ? '#9b2c2c' : '#52676c';
    status.classList.toggle('eam-viewer-message--error', !!(modelError || textureError));
    hint.style.display = message ? 'none' : 'block';
    retryButton.style.display = gl && (modelError || textureError) ? 'inline-block' : 'none';
    canvas.setAttribute('aria-busy', String(loading));
  }
  function setCanvasLabel() {
    const label = props.model === 'halbkassette' ? 'Halbkassettenmarkise'
      : props.model === 'gelenkarm' ? 'Gelenkarmmarkise' : 'Vollkassettenmarkise';
    canvas.setAttribute('aria-label', '3D-Vorschau der ' + label);
  }
let gl: WebGL2RenderingContext | null = null;
let program: WebGLProgram | null = null;
let resizeObserver: ResizeObserver | null = null;
let raf = 0;
let disposed = false;
let activeTexture: WebGLTexture | null = null;
let textureRequest = 0;

const buffers: WebGLBuffer[] = [];
const vaos: WebGLVertexArrayObject[] = [];

type Bounds = { min: number[]; max: number[]; center: number[]; size: number[] };

type MeshGpu = {
  name: string;
  role: 'frame' | 'fabric';
  renderRole: 'frame' | 'fabric' | 'white';
  vao: WebGLVertexArrayObject;
  count: number;
  type: number;
  posBuffer: WebGLBuffer;
  normalBuffer: WebGLBuffer;
  originalPos: Float32Array;
  workingPos: Float32Array;
  originalNormal: Float32Array;
  workingNormal: Float32Array;
  bbox: Bounds;
};

let meshes: MeshGpu[] = [];
let yaw = 0.43;
let pitch = 0.52;
let zoom = 1;
let dragging = false;
let lastX = 0;
let lastY = 0;
let fabricBounds = { minX: 0, maxX: 1, minZ: 0, maxZ: 1 };
let clothReferenceBounds = { minX: 0, maxX: 1, minZ: 0, maxZ: 1 };
let modelBounds = { min: [-2, -.2, -1.6], max: [2, .2, 1.6], center: [0, 0, 0], span: [4, .4, 3.2] };

const FABRIC_REFERENCE_WIDTH_MM = 3665.40134;
const FABRIC_REFERENCE_DEPTH_MM = 3020.64145;

const FULL_HIDDEN = new Set([
  'Chamfe_020', 'Chamfe_006', 'Base_E_005', '_6100____4', 'Chamfe_019',
  'Chamfer1', 'Base_Extru', 'Double_Cha', 'Base_E_012', 'M6_2', '9',
  'Chamfe_010', '1', 'Chamfe_016', '2', 'Chamfe_008', 'Base_E_007',
  'Chamfe_014', '_4', '_1', 'Chamfe_015', 'Double_022', 'Double_082',
  'Chamfe_075', '_1_089', '_4_078', 'Chamfe_074', 'Chamfe_083', 'Base_E_084',
  '2_090', 'Chamfe_076', 'Double_069', 'Base_E_072', 'M6_2_071', '9_073',
  'Chamfe_070', '1_077', 'Chamfe_087', 'Base_E_088', 'Chamfe_079',
  '_6100__081', 'Chamfe_085', 'Base_E_086', 'Chamfe_080',
]);

const FULL_GEOM = Object.freeze({
  referenceNominalWidthMm: 4000,
  referenceProjectionMm: 3000,
  foldedJointSafetyMm: 50,
  foldedReachFactor: .40,
  axisCenterX: .000794,
  rearHalfSpanM: 1.28548985,
  middleHalfSpanM: .88723790,
  frontHalfSpanM: 1.25812565,
  rearJointZ: -1.39002695,
  middleJointZ: .07825749,
  frontJointZ: 1.52233325,
});

const FULL_SOURCE: Record<'-1' | '1', Record<'rear' | 'middle' | 'front', [number, number]>> = {
  '-1': { rear: [-1.2846954, -1.3900274], middle: [-.88644415, .07825740], front: [-1.2573322, 1.5223328] },
  '1': { rear: [1.2862843, -1.3900265], middle: [.88803166, .07825758], front: [1.2589191, 1.5223337] },
};
const FULL_ARM: Record<string, { side: -1 | 1; part: 'wall' | 'front'; a: [number, number]; b: [number, number] }> = {
  '_1_039': { side: -1, part: 'wall', a: [-1.2944, -1.3667], b: [-.8564, .0519] },
  '_1_034': { side: -1, part: 'front', a: [-.8638, .1082], b: [-1.2616, 1.4958] },
  '_1_041': { side: 1, part: 'wall', a: [1.2944, -1.3667], b: [.8564, .0519] },
  '_1_046': { side: 1, part: 'front', a: [.8638, .1082], b: [1.2616, 1.4958] },
};
const FULL_REAR: Record<string, { side: -1 | 1 }> = { '5': { side: -1 }, '5_057': { side: 1 } };
const FULL_MID: Record<string, { side: -1 | 1 }> = {
  '6_037': { side: -1 }, '1_038': { side: -1 }, '1_036': { side: -1 }, '_8': { side: -1 },
  '6_043': { side: 1 }, '1_042': { side: 1 }, '1_044': { side: 1 }, '_8_045': { side: 1 },
};
const FULL_FRONT: Record<string, { side: -1 | 1 }> = {
  '6': { side: -1 }, '_6': { side: -1 }, '1_030': { side: -1 }, '1_031': { side: -1 }, 'Double_028': { side: -1 }, 'Double_029': { side: -1 }, 'Base_E_026': { side: -1 }, 'Base_E_025': { side: -1 }, 'HeadFillet': { side: -1 }, 'HeadFi_027': { side: -1 },
  '6_047': { side: 1 }, '_6_048': { side: 1 }, '1_049': { side: 1 }, '1_050': { side: 1 }, 'Double_052': { side: 1 }, 'Double_051': { side: 1 }, 'Base_E_054': { side: 1 }, 'Base_E_055': { side: 1 }, 'HeadFi_056': { side: 1 }, 'HeadFi_053': { side: 1 },
};
const FULL_SIDE: Record<string, { shiftWithSide: -1 | 1 }> = { '2_110': { shiftWithSide: -1 } };

type FullMetrics = { w:number; p:number; dw:number; dp:number; shoulder:number; middle:number; front:number; rearZ:number; frontZ:number; midZ:number; clearance:number };

function bboxFromPositions(values: Float32Array): Bounds {
  const min = [Infinity, Infinity, Infinity]; const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < values.length; i += 3) for (let k = 0; k < 3; k += 1) { min[k] = Math.min(min[k], values[i + k]); max[k] = Math.max(max[k], values[i + k]); }
  return { min, max, center: min.map((v, k) => (v + max[k]) / 2), size: min.map((v, k) => max[k] - v) };
}
function mapSegmentPoint(x:number,z:number,srcA:[number,number],srcB:[number,number],dstA:[number,number],dstB:[number,number]) {
  const vx=srcB[0]-srcA[0], vz=srcB[1]-srcA[1], sl=Math.hypot(vx,vz)||1, ux=vx/sl, uz=vz/sl, px=-uz, pz=ux;
  const rx=x-srcA[0], rz=z-srcA[1], along=rx*ux+rz*uz, perp=rx*px+rz*pz;
  const tx=dstB[0]-dstA[0], tz=dstB[1]-dstA[1], tl=Math.hypot(tx,tz)||1, tux=tx/tl, tuz=tz/tl, tpx=-tuz, tpz=tux;
  return [dstA[0]+tux*(along/sl*tl)+tpx*perp, dstA[1]+tuz*(along/sl*tl)+tpz*perp, Math.atan2(tuz,tux)-Math.atan2(uz,ux)] as [number,number,number];
}
function rotateNormalXZ(nx:number,nz:number,a:number) { const c=Math.cos(a), s=Math.sin(a); return [nx*c-nz*s, nx*s+nz*c] as [number,number]; }
function angleBisectorXZ(p:[number,number],a:[number,number],b:[number,number]) {
  const v1=norm([a[0]-p[0],0,a[1]-p[1]]), v2=norm([b[0]-p[0],0,b[1]-p[1]]); let sx=v1[0]+v2[0], sz=v1[2]+v2[2];
  if (Math.hypot(sx,sz)<1e-7) { sx=v2[0]-v1[0]; sz=v2[2]-v1[2]; } return Math.atan2(sz,sx);
}
function fullSourceJoint(side:-1|1,kind:'rear'|'middle'|'front') { return FULL_SOURCE[String(side) as '-1'|'1'][kind]; }
function fullMetrics(): FullMetrics {
  const g=FULL_GEOM, w=props.widthMm/1000, p=props.projectionMm/1000, dw=(props.widthMm-g.referenceNominalWidthMm)/1000, dp=(props.projectionMm-g.referenceProjectionMm)/1000;
  const naturalShoulder=g.rearHalfSpanM+dw/2, foldedReach=g.foldedReachFactor*p, minShoulder=foldedReach+g.foldedJointSafetyMm/2000;
  const shoulder=Math.min(w/2-.15,Math.max(naturalShoulder,minShoulder)), clearance=Math.max(0,(2*shoulder-2*foldedReach)*1000);
  const middleInset=(g.rearHalfSpanM-g.middleHalfSpanM)*(p/(g.referenceProjectionMm/1000)), middle=Math.max(.12,shoulder-middleInset);
  const frontInset=(g.rearHalfSpanM-g.frontHalfSpanM)*(p/(g.referenceProjectionMm/1000)), front=Math.max(.12,shoulder-frontInset);
  const frontZ=g.frontJointZ+dp, midT=(g.middleJointZ-g.rearJointZ)/(g.frontJointZ-g.rearJointZ), midZ=g.rearJointZ+(frontZ-g.rearJointZ)*midT;
  return {w,p,dw,dp,shoulder,middle,front,rearZ:g.rearJointZ,frontZ,midZ,clearance};
}
function fullTargetJoint(side:-1|1,kind:'rear'|'middle'|'front',m:FullMetrics):[number,number] { const cx=FULL_GEOM.axisCenterX; if(kind==='rear')return[cx+side*m.shoulder,m.rearZ]; if(kind==='middle')return[cx+side*m.middle,m.midZ]; return[cx+side*m.front,m.frontZ]; }
function fullMiddleTransform(side:-1|1,x:number,z:number,m:FullMetrics) {
  const sp=fullSourceJoint(side,'middle'), sw=fullSourceJoint(side,'rear'), sf=fullSourceJoint(side,'front'), dp=fullTargetJoint(side,'middle',m), dw=fullTargetJoint(side,'rear',m), df=fullTargetJoint(side,'front',m);
  const sa=angleBisectorXZ(sp,sw,sf), da=angleBisectorXZ(dp,dw,df), a=da-sa, c=Math.cos(a), s=Math.sin(a), rx=x-sp[0], rz=z-sp[1]; return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a] as [number,number,number];
}
function fullEndpointTransform(side:-1|1,where:'rear'|'front',x:number,z:number,m:FullMetrics) {
  const sp=fullSourceJoint(side,where), so=fullSourceJoint(side,'middle'), dp=fullTargetJoint(side,where,m), dO=fullTargetJoint(side,'middle',m);
  const sa=Math.atan2(so[1]-sp[1],so[0]-sp[0]), da=Math.atan2(dO[1]-dp[1],dO[0]-dp[0]), a=da-sa, c=Math.cos(a), s=Math.sin(a), rx=x-sp[0], rz=z-sp[1]; return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a] as [number,number,number];
}
function fullArmSegmentTargets(seg:{side:-1|1;part:'wall'|'front';a:[number,number];b:[number,number]},m:FullMetrics) {
  const kindA:'rear'|'middle'=seg.part==='wall'?'rear':'middle';
  const kindB:'middle'|'front'=seg.part==='wall'?'middle':'front';
  const srcJointA=fullSourceJoint(seg.side,kindA),srcJointB=fullSourceJoint(seg.side,kindB);
  const dstJointA=fullTargetJoint(seg.side,kindA,m),dstJointB=fullTargetJoint(seg.side,kindB,m);
  const srcAngle=Math.atan2(srcJointB[1]-srcJointA[1],srcJointB[0]-srcJointA[0]);
  const dstAngle=Math.atan2(dstJointB[1]-dstJointA[1],dstJointB[0]-dstJointA[0]);
  const delta=dstAngle-srcAngle,c=Math.cos(delta),s=Math.sin(delta);
  const transformEnd=(point:[number,number],srcJoint:[number,number],dstJoint:[number,number])=>{
    const ox=point[0]-srcJoint[0],oz=point[1]-srcJoint[1];
    return [dstJoint[0]+ox*c-oz*s,dstJoint[1]+ox*s+oz*c] as [number,number];
  };
  return {
    dstA:transformEnd(seg.a,srcJointA,dstJointA),
    dstB:transformEnd(seg.b,srcJointB,dstJointB),
  };
}
function fullTransform(mesh:MeshGpu,x:number,y:number,z:number,m:FullMetrics):[number,number,number,number] {
  const b=mesh.bbox,c=b.center,name=mesh.name,side:-1|1=c[0]<0?-1:1; let nx=x,ny=y,nz=z;
  if(mesh.role==='fabric'){const sx=(b.size[0]+m.dw)/b.size[0], sz=(b.size[2]+m.dp)/b.size[2];return[(x-c[0])*sx+c[0],ny,clothReferenceBounds.minZ+(z-clothReferenceBounds.minZ)*sz,0];}
  const seg=FULL_ARM[name]; if(seg){const target=fullArmSegmentTargets(seg,m),q=mapSegmentPoint(x,z,seg.a,seg.b,target.dstA,target.dstB);return[q[0],ny,q[1],q[2]];}
  const ra=FULL_REAR[name]; if(ra){const q=fullEndpointTransform(ra.side,'rear',x,z,m);return[q[0],ny,q[1],q[2]];}
  const sidePart=FULL_SIDE[name]; if(sidePart)return[x+sidePart.shiftWithSide*m.dw/2,ny,nz,0];
  const ma=FULL_MID[name]; if(ma){const q=fullMiddleTransform(ma.side,x,z,m);return[q[0],ny,q[1],q[2]];}
  const fa=FULL_FRONT[name]; if(fa){const q=fullEndpointTransform(fa.side,'front',x,z,m);return[q[0],ny,q[1],q[2]];}
  if(b.size[0]>3){const sx=(b.size[0]+m.dw)/b.size[0];nx=(x-c[0])*sx+c[0];if(c[2]>1)nz=z+m.dp;return[nx,ny,nz,0];}
  if(Math.abs(c[0])>1.70){nx=x+side*m.dw/2;if(c[2]>1)nz=z+m.dp;return[nx,ny,nz,0];}
  if(Math.abs(c[0])>1.05&&Math.abs(c[0])<1.50&&c[2]<-1.15&&c[2]>-1.55){const sp=fullSourceJoint(side,'rear'),tp=fullTargetJoint(side,'rear',m);return[x+tp[0]-sp[0],ny,z+tp[1]-sp[1],0];}
  if(Math.abs(c[0])>1.05&&Math.abs(c[0])<1.50&&c[2]>1.20){const sp=fullSourceJoint(side,'front'),tp=fullTargetJoint(side,'front',m);return[x+tp[0]-sp[0],ny,z+tp[1]-sp[1],0];}
  if(c[2]>1.20)nz=z+m.dp; return[nx,ny,nz,0];
}


const HALF_GEOM = Object.freeze({
  referenceWidthMm:2950,
  referenceProjectionMm:2500,
  outerHalf:1.4745,
  rearHalf:1.2729514,
  middleHalf:1.027316,
  frontHalf:1.1927736,
  rearZ:.0581188,
  middleZ:1.254644,
  frontZ:2.417846,
  clothMinZ:.098634,
  clothMaxZ:2.442773,
  clothWidth:2.82,
});
const HALF_SOURCE: Record<'-1'|'1', Record<'rear'|'middle'|'front',[number,number]>> = {
  '-1': { rear:[-1.2729514,.0581188], middle:[-1.027316,1.254644], front:[-1.1927736,2.417846] },
  '1': { rear:[1.2729514,.0581188], middle:[1.027316,1.254644], front:[1.1927736,2.417846] },
};
const HALF_ARM: Record<string,{side:-1|1;part:'wall'|'front'}> = {
  'part_19':{side:-1,part:'wall'}, 'part_22':{side:-1,part:'front'},
  'part_28':{side:1,part:'wall'}, 'part_31':{side:1,part:'front'},
};
const HALF_REAR: Record<string,-1|1> = Object.fromEntries([
  ['part_17',-1],['part_16',-1],['part_18',-1],['part_38',-1],['part 2_2',-1],['part_35',-1],['part_15',-1],['part_36',-1],['part 2_3',-1],['part 2_4',-1],['part_37',-1],['part 2_8',-1],['part 2_1',-1],['part 2_7',-1],['part_47',-1],['part_45',-1],['part_34',-1],
  ['part_26',1],['part_25',1],['part_27',1],['part 2_5',1],['part 4_1',1],['part 3_1',1],['part 2',1],['part 3_2',1],['part 4_2',1],['part 4_3',1],['part 3_3',1],['part 3_5',1],['part 3',1],['part 3_4',1],['part 4_5',1],['part 4_4',1],['part 4',1],
] as [string,-1|1][]);
const HALF_MID: Record<string,-1|1> = Object.fromEntries([
  ['part_52',-1],['part_21',-1],['part_20',-1],['part 2_13',1],['part_30',1],['part_29',1],
] as [string,-1|1][]);
const HALF_FRONT: Record<string,-1|1> = Object.fromEntries([
  ['part_24',-1],['part_42',-1],['part_23',-1],['part_33',1],['part 2_6',1],['part_32',1],
] as [string,-1|1][]);
const HALF_FRONT_ENDCAPS: Record<string,-1|1> = { 'part_41':-1, 'part_40':1 };
const HALF_MOTOR_SHIFT = new Set(['part_3']);
const HALF_HIDDEN = new Set(['part_44','part 5','part_46','part 5_1']);
const HALF_VALANCE_FABRIC = new Set(['groupNumber_25']);
const HALF_VALANCE_WHITE = new Set(['groupNumber_12']);

type HalfMetrics = { w:number;p:number;dw:number;pf:number;rear:number;middle:number;front:number;rearZ:number;middleZ:number;frontZ:number;frontDelta:number };
function halfSourceJoint(side:-1|1,kind:'rear'|'middle'|'front') { return HALF_SOURCE[String(side) as '-1'|'1'][kind]; }
function halfMetrics(): HalfMetrics {
  const w=props.widthMm/1000,p=props.projectionMm/1000,dw=w-HALF_GEOM.referenceWidthMm/1000,pf=p/(HALF_GEOM.referenceProjectionMm/1000);
  const rear=Math.max(.30,w/2-(HALF_GEOM.outerHalf-HALF_GEOM.rearHalf));
  const middle=Math.max(.12,rear-(HALF_GEOM.rearHalf-HALF_GEOM.middleHalf)*pf);
  const front=Math.max(.20,w/2-(HALF_GEOM.outerHalf-HALF_GEOM.frontHalf));
  const rearZ=HALF_GEOM.rearZ,middleZ=rearZ+(HALF_GEOM.middleZ-rearZ)*pf,frontZ=rearZ+(HALF_GEOM.frontZ-rearZ)*pf;
  return {w,p,dw,pf,rear,middle,front,rearZ,middleZ,frontZ,frontDelta:frontZ-HALF_GEOM.frontZ};
}
function halfTargetJoint(side:-1|1,kind:'rear'|'middle'|'front',m:HalfMetrics):[number,number] {
  if(kind==='rear')return[side*m.rear,m.rearZ]; if(kind==='middle')return[side*m.middle,m.middleZ]; return[side*m.front,m.frontZ];
}
function halfMiddleTransform(side:-1|1,x:number,z:number,m:HalfMetrics) {
  const sp=halfSourceJoint(side,'middle'),sw=halfSourceJoint(side,'rear'),sf=halfSourceJoint(side,'front'),dp=halfTargetJoint(side,'middle',m),dw=halfTargetJoint(side,'rear',m),df=halfTargetJoint(side,'front',m);
  const sa=angleBisectorXZ(sp,sw,sf),da=angleBisectorXZ(dp,dw,df),a=da-sa,c=Math.cos(a),s=Math.sin(a),rx=x-sp[0],rz=z-sp[1];
  return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a] as [number,number,number];
}
function halfEndpointTransform(side:-1|1,where:'rear'|'front',x:number,z:number,m:HalfMetrics) {
  const kind=where==='rear'?'rear':'front',sp=halfSourceJoint(side,kind),so=halfSourceJoint(side,'middle'),dp=halfTargetJoint(side,kind,m),dO=halfTargetJoint(side,'middle',m);
  const sa=Math.atan2(so[1]-sp[1],so[0]-sp[0]),da=Math.atan2(dO[1]-dp[1],dO[0]-dp[0]),a=da-sa,c=Math.cos(a),s=Math.sin(a),rx=x-sp[0],rz=z-sp[1];
  return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a] as [number,number,number];
}
function halfTransform(mesh:MeshGpu,x:number,y:number,z:number,m:HalfMetrics):[number,number,number,number] {
  const b=mesh.bbox,c=b.center,name=mesh.name,side:-1|1=c[0]<0?-1:1; let nx=x,ny=y,nz=z;
  if(mesh.role==='fabric') { const targetWidth=Math.max(.25,HALF_GEOM.clothWidth+m.dw),sx=targetWidth/HALF_GEOM.clothWidth; return[x*sx,ny,HALF_GEOM.clothMinZ+(z-HALF_GEOM.clothMinZ)*m.pf,0]; }
  const seg=HALF_ARM[name]; if(seg) { const sr=halfSourceJoint(seg.side,'rear'),sm=halfSourceJoint(seg.side,'middle'),sf=halfSourceJoint(seg.side,'front'),dr=halfTargetJoint(seg.side,'rear',m),dm=halfTargetJoint(seg.side,'middle',m),df=halfTargetJoint(seg.side,'front',m); const q=mapSegmentPoint(x,z,seg.part==='wall'?sr:sm,seg.part==='wall'?sm:sf,seg.part==='wall'?dr:dm,seg.part==='wall'?dm:df); return[q[0],ny,q[1],q[2]]; }
  const rearSide=HALF_REAR[name]; if(rearSide) { const q=halfEndpointTransform(rearSide,'rear',x,z,m); return[q[0],ny,q[1],q[2]]; }
  const midSide=HALF_MID[name]; if(midSide) { const q=halfMiddleTransform(midSide,x,z,m); return[q[0],ny,q[1],q[2]]; }
  const frontSide=HALF_FRONT[name]; if(frontSide) { const q=halfEndpointTransform(frontSide,'front',x,z,m); return[q[0],ny,q[1],q[2]]; }
  const capSide=HALF_FRONT_ENDCAPS[name]; if(capSide) return[x+capSide*m.dw/2,ny,z+m.frontDelta,0];
  if(HALF_MOTOR_SHIFT.has(name)) return[x+m.dw/2,ny,nz,0];
  if(b.size[0]>2.0) { const sx=(b.size[0]+m.dw)/b.size[0]; nx=(x-c[0])*sx+c[0]; if(c[2]>2.20)nz=z+m.frontDelta; return[nx,ny,nz,0]; }
  if(c[2]>2.30) return[x*(m.w/(HALF_GEOM.referenceWidthMm/1000)),ny,z+m.frontDelta,0];
  if(c[2]<.25&&Math.abs(c[0])>1.35) return[x+side*m.dw/2,ny,nz,0];
  if(c[2]>2.15&&Math.abs(c[0])>1.25) return[x+side*m.dw/2,ny,z+m.frontDelta,0];
  return[nx,ny,nz,0];
}


const ARM_GEOM = Object.freeze({
  referenceWidthMm:3000,
  referenceProjectionMm:2500,
  outerHalf:1.5,
  rearHalf:1.176803,
  middleHalf:.20341,
  frontHalf:.888635,
  rearZ:.050012,
  middleZ:1.040725,
  frontZ:2.465987,
  clothWidth:2.901863,
  clothMinZ:0,
  clothMaxZ:2.5,
});
const ARM_SOURCE: Record<'-1'|'1', Record<'rear'|'middle'|'front',[number,number]>> = {
  '-1': { rear:[-1.1754511,.0500107], middle:[-.20206,1.04072], front:[-.8872802,2.4659914] },
  '1': { rear:[1.1781549,.0500129], middle:[.20476,1.04073], front:[.8899895,2.4659822] },
};
const ARM_SEGMENTS: Record<string,{side:-1|1;part:'wall'|'front'}> = {
  'Obj_000047':{side:-1,part:'wall'}, 'Obj_000044':{side:-1,part:'front'},
  'Obj_000056':{side:1,part:'wall'}, 'Obj_000053':{side:1,part:'front'},
};
const ARM_REAR: Record<string,-1|1> = Object.fromEntries([
  ['Obj_000027',-1],['Obj_000028',-1],['Obj_000029',-1],['Obj_000030',-1],['Obj_000031',-1],['Obj_000032',-1],['Obj_000033',-1],['Obj_000034',-1],['Obj_000035',-1],['Obj_000036',-1],['Obj_000037',-1],['Obj_000038',-1],['Obj_000039',-1],['Obj_000040',-1],['Obj_000041',-1],['Obj_000048',-1],['Obj_000049',-1],['Obj_000050',-1],['Obj_000066',-1],
  ['Obj_000057',1],['Obj_000058',1],['Obj_000059',1],['Obj_000060',1],['Obj_000061',1],['Obj_000062',1],['Obj_000063',1],['Obj_000064',1],['Obj_000065',1],['Obj_000067',1],['Obj_000068',1],['Obj_000069',1],['Obj_000070',1],['Obj_000071',1],['Obj_000072',1],['Obj_000073',1],['Obj_000074',1],['Obj_000075',1],['Obj_000076',1],
] as [string,-1|1][]);
const ARM_MID: Record<string,-1|1> = Object.fromEntries([
  ['Obj_000004',-1],['Obj_000045',-1],['Obj_000046',-1],['Obj_000005',1],['Obj_000054',1],['Obj_000055',1],
] as [string,-1|1][]);
const ARM_FRONT: Record<string,-1|1> = Object.fromEntries([
  ['Obj_000022',-1],['Obj_000042',-1],['Obj_000043',-1],['Obj_000023',1],['Obj_000051',1],['Obj_000052',1],
] as [string,-1|1][]);
const ARM_FRONT_CAPS: Record<string,-1|1> = { 'Obj_000025':-1, 'Obj_000024':1 };
const ARM_HIDDEN = new Set([
  'Obj_000006','Obj_000007','Obj_000008','Obj_000009','Obj_000010','Obj_000011','Obj_000012','Obj_000013','Obj_000014','Obj_000015','Obj_000016','Obj_000017','Obj_000018','Obj_000019','Obj_000020',
]);
const ARM_VALANCE_FABRIC = new Set(['shell_2']);
const ARM_VALANCE_WHITE = new Set(['shell_3']);

type ArmMetrics = { w:number;p:number;dw:number;pf:number;rear:number;middle:number;front:number;rearZ:number;middleZ:number;frontZ:number;frontDelta:number };
function armSourceJoint(side:-1|1,kind:'rear'|'middle'|'front') { return ARM_SOURCE[String(side) as '-1'|'1'][kind]; }
function armMetrics(): ArmMetrics {
  const w=props.widthMm/1000,p=props.projectionMm/1000,dw=w-ARM_GEOM.referenceWidthMm/1000,pf=p/(ARM_GEOM.referenceProjectionMm/1000);
  const rear=Math.max(.30,w/2-(ARM_GEOM.outerHalf-ARM_GEOM.rearHalf));
  const front=Math.max(.20,w/2-(ARM_GEOM.outerHalf-ARM_GEOM.frontHalf));
  const middle=Math.max(.10,rear-(ARM_GEOM.rearHalf-ARM_GEOM.middleHalf)*pf);
  const rearZ=ARM_GEOM.rearZ,middleZ=rearZ+(ARM_GEOM.middleZ-rearZ)*pf,frontZ=rearZ+(ARM_GEOM.frontZ-rearZ)*pf;
  return {w,p,dw,pf,rear,middle,front,rearZ,middleZ,frontZ,frontDelta:frontZ-ARM_GEOM.frontZ};
}
function armTargetJoint(side:-1|1,kind:'rear'|'middle'|'front',m:ArmMetrics):[number,number] {
  if(kind==='rear')return[side*m.rear,m.rearZ]; if(kind==='middle')return[side*m.middle,m.middleZ]; return[side*m.front,m.frontZ];
}
function armMiddleTransform(side:-1|1,x:number,z:number,m:ArmMetrics) {
  const sp=armSourceJoint(side,'middle'),sw=armSourceJoint(side,'rear'),sf=armSourceJoint(side,'front'),dp=armTargetJoint(side,'middle',m),dw=armTargetJoint(side,'rear',m),df=armTargetJoint(side,'front',m);
  const sa=angleBisectorXZ(sp,sw,sf),da=angleBisectorXZ(dp,dw,df),a=da-sa,c=Math.cos(a),s=Math.sin(a),rx=x-sp[0],rz=z-sp[1];
  return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a] as [number,number,number];
}
function armEndpointTransform(side:-1|1,where:'rear'|'front',x:number,z:number,m:ArmMetrics) {
  const kind=where==='rear'?'rear':'front',sp=armSourceJoint(side,kind),so=armSourceJoint(side,'middle'),dp=armTargetJoint(side,kind,m),dO=armTargetJoint(side,'middle',m);
  const sa=Math.atan2(so[1]-sp[1],so[0]-sp[0]),da=Math.atan2(dO[1]-dp[1],dO[0]-dp[0]),a=da-sa,c=Math.cos(a),s=Math.sin(a),rx=x-sp[0],rz=z-sp[1];
  return [dp[0]+rx*c-rz*s,dp[1]+rx*s+rz*c,a] as [number,number,number];
}
function armTransform(mesh:MeshGpu,x:number,y:number,z:number,m:ArmMetrics):[number,number,number,number] {
  const b=mesh.bbox,c=b.center,name=mesh.name,side:-1|1=c[0]<0?-1:1; let nx=x,ny=y,nz=z;
  if(mesh.role==='fabric'){const target=Math.max(.25,ARM_GEOM.clothWidth+m.dw),sx=target/ARM_GEOM.clothWidth;return[(x-c[0])*sx+c[0],ny,ARM_GEOM.clothMinZ+(z-ARM_GEOM.clothMinZ)*m.pf,0];}
  const seg=ARM_SEGMENTS[name]; if(seg){const sr=armSourceJoint(seg.side,'rear'),sm=armSourceJoint(seg.side,'middle'),sf=armSourceJoint(seg.side,'front'),dr=armTargetJoint(seg.side,'rear',m),dm=armTargetJoint(seg.side,'middle',m),df=armTargetJoint(seg.side,'front',m),q=mapSegmentPoint(x,z,seg.part==='wall'?sr:sm,seg.part==='wall'?sm:sf,seg.part==='wall'?dr:dm,seg.part==='wall'?dm:df);return[q[0],ny,q[1],q[2]];}
  const rearSide=ARM_REAR[name]; if(rearSide){const q=armEndpointTransform(rearSide,'rear',x,z,m);return[q[0],ny,q[1],q[2]];}
  const midSide=ARM_MID[name]; if(midSide){const q=armMiddleTransform(midSide,x,z,m);return[q[0],ny,q[1],q[2]];}
  const frontSide=ARM_FRONT[name]; if(frontSide){const q=armEndpointTransform(frontSide,'front',x,z,m);return[q[0],ny,q[1],q[2]];}
  const capSide=ARM_FRONT_CAPS[name]; if(capSide)return[x+capSide*m.dw/2,ny,z+m.frontDelta,0];
  if(b.size[0]>2.0){const sx=(b.size[0]+m.dw)/b.size[0];nx=(x-c[0])*sx+c[0];if(c[2]>2.30)nz=z+m.frontDelta;return[nx,ny,nz,0];}
  if(c[2]>2.30){nx=x+side*m.dw/2;nz=z+m.frontDelta;return[nx,ny,nz,0];}
  if(c[2]<.20&&Math.abs(c[0])>1.30){nx=x+side*m.dw/2;return[nx,ny,nz,0];}
  return[nx,ny,nz,0];
}

const modelUrl = () => assetBase.replace(/\/$/, '') + '/models/' + (props.model === 'vollkassette'
  ? 'vollkassette-6100.glb' : props.model === 'halbkassette'
    ? 'halbkassette-2950.glb' : 'gelenkarm-1100.glb');

const hexRgb = (hex: string) => {
  const value = Number.parseInt(hex.replace('#', ''), 16);
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
};

function shader(type: number, source: string) {
  if (!gl) throw new Error('WebGL ist nicht initialisiert.');
  const s = gl.createShader(type);
  if (!s) throw new Error('Shader konnte nicht erstellt werden.');
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(s) || 'Shader-Fehler';
    gl.deleteShader(s);
    throw new Error(message);
  }
  return s;
}

function makeProgram(vertexSource: string, fragmentSource: string) {
  if (!gl) throw new Error('WebGL ist nicht initialisiert.');
  const p = gl.createProgram();
  if (!p) throw new Error('WebGL-Programm konnte nicht erstellt werden.');
  let v: WebGLShader | null = null;
  let f: WebGLShader | null = null;
  try {
    v = shader(gl.VERTEX_SHADER, vertexSource);
    f = shader(gl.FRAGMENT_SHADER, fragmentSource);
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(p) || 'WebGL-Link-Fehler');
    }
    return p;
  } catch (cause) {
    gl.deleteProgram(p);
    throw cause;
  } finally {
    if (v) gl.deleteShader(v);
    if (f) gl.deleteShader(f);
  }
}

const vertexSource = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
uniform mat4 uMvp;
out vec3 vNormal;
out vec3 vPosition;
void main(){
  vNormal = aNormal;
  vPosition = aPosition;
  gl_Position = uMvp * vec4(aPosition, 1.0);
}`;

const fragmentSource = `#version 300 es
precision highp float;
in vec3 vNormal;
in vec3 vPosition;
uniform vec3 uColor;
uniform vec3 uEye;
uniform float uFabric;
uniform float uHasTexture;
uniform sampler2D uTex;
uniform vec2 uFabricMin;
uniform vec2 uFabricInvSize;
out vec4 fragColor;
void main(){
  vec3 n = normalize(vNormal);
  if(!gl_FrontFacing) n = -n;
  vec3 l = normalize(vec3(-2.8,5.0,3.7));
  vec3 fill = normalize(vec3(4.0,2.0,-3.0));
  vec3 view = normalize(uEye-vPosition);
  vec3 base;
  if(uFabric>.5 && uHasTexture>.5){
    vec2 uv=(vPosition.xz-uFabricMin)*uFabricInvSize;
    uv.y=1.0-uv.y;
    base=texture(uTex,uv).rgb;
  } else {
    base=pow(uColor,vec3(2.2));
  }
  vec3 c;
  if(uFabric<.5){
    float diffuse=.50+.07*n.y+.53*max(dot(n,l),0.0)+.20*max(dot(n,fill),0.0);
    c=base*diffuse;
    vec3 h=normalize(l+view);
    float spec=pow(max(dot(n,h),0.0),30.0)*.105*max(dot(n,l),0.0);
    float broad=pow(max(dot(n,h),0.0),7.0)*.050;
    float rim=pow(1.0-max(dot(n,view),0.0),3.0)*.010;
    c+=vec3(spec+broad+rim);
  } else {
    float ndv=max(dot(n,view),0.0);
    float wrap=.58+.42*max(dot(n,l)*.78+.22,0.0)+.12*max(dot(n,fill),0.0);
    float sheen=pow(1.0-ndv,3.2)*.065;
    float soft=pow(max(dot(n,normalize(l+view)),0.0),7.0)*.018;
    c=base*(wrap+.025)+base*sheen+vec3(soft);
  }
  c=pow(max(c,vec3(0.0)),vec3(1.0/2.2));
  fragColor=vec4(clamp(c,0.0,1.0),1.0);
}`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const cross = (a: number[], b: number[]) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: number[]) => {
  const length = Math.hypot(...a) || 1;
  return a.map((v) => v / length);
};

function lookAt(eye: number[], target: number[]) {
  const z = norm(eye.map((v, i) => v - target[i]));
  const x = norm(cross([0, 1, 0], z));
  const y = cross(z, x);
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
  ]);
}

function perspective(fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

function multiply(a: Float32Array, b: Float32Array) {
  const result = new Float32Array(16);
  for (let c = 0; c < 4; c += 1) {
    for (let r = 0; r < 4; r += 1) {
      for (let k = 0; k < 4; k += 1) {
        result[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
      }
    }
  }
  return result;
}

function disposeGpu() {
  if (!gl) return;
  for (const vao of vaos) gl.deleteVertexArray(vao);
  for (const buffer of buffers) gl.deleteBuffer(buffer);
  vaos.length = 0;
  buffers.length = 0;
  meshes = [];
}

function disposeTexture() {
  if (gl && activeTexture) gl.deleteTexture(activeTexture);
  activeTexture = null;
}

function initWebGl() {
  if (!canvas) return;
  gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
  });
  if (!gl) throw new Error('WebGL 2 wird von diesem Browser nicht unterstützt.');
  program = makeProgram(vertexSource, fragmentSource);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.disable(gl.CULL_FACE);
  gl.clearColor(1, 1, 1, 1);
}

function accessorFactory(buffer: ArrayBuffer, json: any, binOffset: number, binLength: number) {
  const arrays: Record<number, any> = { 5126: Float32Array, 5125: Uint32Array, 5123: Uint16Array };
  const components: Record<string, number> = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };

  return (index: number) => {
    const accessor = json.accessors[index];
    const view = json.bufferViews[accessor.bufferView];
    const ArrayType = arrays[accessor.componentType];
    const size = components[accessor.type];
    if (!ArrayType || !size || view.byteStride || accessor.sparse || view.buffer !== 0) {
      throw new Error('Nicht unterstütztes GLB-Accessor-Format.');
    }
    const offset = (view.byteOffset || 0) + (accessor.byteOffset || 0);
    const count = accessor.count * size;
    if (offset + count * ArrayType.BYTES_PER_ELEMENT > binLength) {
      throw new Error('GLB-Accessor liegt außerhalb des Puffers.');
    }
    return { array: new ArrayType(buffer, binOffset + offset, count), spec: accessor };
  };
}

function uploadGlb(buffer: ArrayBuffer) {
  if (!gl) throw new Error('WebGL ist nicht initialisiert.');
  const view = new DataView(buffer);
  if (view.byteLength < 20 || view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2) throw new Error('Ungültige GLB-Datei.');
  let at=12,json:any=null,binOffset=0,binLength=0;
  while(at<buffer.byteLength){if(at+8>buffer.byteLength)throw new Error('Unvollständige GLB-Datei.');const length=view.getUint32(at,true),type=view.getUint32(at+4,true);at+=8;if(at+length>buffer.byteLength)throw new Error('Unvollständiger GLB-Datenblock.');if(type===0x4e4f534a)json=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,at,length)).replace(/\0+$/,''));if(type===0x004e4942){binOffset=at;binLength=length}at+=length;}
  if(!json||!binOffset||!json.meshes)throw new Error('GLB-Geometrie fehlt.');
  const accessor=accessorFactory(buffer,json,binOffset,binLength);let minFabricX=Infinity,maxFabricX=-Infinity,minFabricZ=Infinity,maxFabricZ=-Infinity;
  for(const sourceMesh of json.meshes){const role=sourceMesh.extras?.role as 'frame'|'fabric'|undefined;if(role!=='frame'&&role!=='fabric')continue;if(props.model==='vollkassette'&&FULL_HIDDEN.has(sourceMesh.name))continue;if(props.model==='halbkassette'&&HALF_HIDDEN.has(sourceMesh.name))continue;if(props.model==='gelenkarm'&&ARM_HIDDEN.has(sourceMesh.name))continue;const renderRole:'frame'|'fabric'|'white'=props.model==='halbkassette'&&HALF_VALANCE_FABRIC.has(sourceMesh.name)?'fabric':props.model==='halbkassette'&&HALF_VALANCE_WHITE.has(sourceMesh.name)?'white':props.model==='gelenkarm'&&ARM_VALANCE_FABRIC.has(sourceMesh.name)?'fabric':props.model==='gelenkarm'&&ARM_VALANCE_WHITE.has(sourceMesh.name)?'white':role;
    for(const primitive of sourceMesh.primitives){if(primitive.attributes.POSITION===undefined||primitive.indices===undefined)continue;const positions=accessor(primitive.attributes.POSITION),normals=primitive.attributes.NORMAL!==undefined?accessor(primitive.attributes.NORMAL):null,indices=accessor(primitive.indices);
      const originalPos=new Float32Array(positions.array as Float32Array),workingPos=new Float32Array(originalPos),originalNormal=normals?new Float32Array(normals.array as Float32Array):new Float32Array(originalPos.length);if(!normals)for(let i=1;i<originalNormal.length;i+=3)originalNormal[i]=1;const workingNormal=new Float32Array(originalNormal),bbox=bboxFromPositions(originalPos);
      if(role==='fabric')for(let i=0;i<originalPos.length;i+=3){minFabricX=Math.min(minFabricX,originalPos[i]);maxFabricX=Math.max(maxFabricX,originalPos[i]);minFabricZ=Math.min(minFabricZ,originalPos[i+2]);maxFabricZ=Math.max(maxFabricZ,originalPos[i+2]);}
      const vao=gl.createVertexArray();if(!vao)throw new Error('VAO konnte nicht erstellt werden.');vaos.push(vao);gl.bindVertexArray(vao);
      const posBuffer=gl.createBuffer();if(!posBuffer)throw new Error('Positionspuffer konnte nicht erstellt werden.');buffers.push(posBuffer);gl.bindBuffer(gl.ARRAY_BUFFER,posBuffer);gl.bufferData(gl.ARRAY_BUFFER,workingPos,gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
      const normalBuffer=gl.createBuffer();if(!normalBuffer)throw new Error('Normalenpuffer konnte nicht erstellt werden.');buffers.push(normalBuffer);gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);gl.bufferData(gl.ARRAY_BUFFER,workingNormal,gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,3,gl.FLOAT,false,0,0);
      const indexBuffer=gl.createBuffer();if(!indexBuffer)throw new Error('Indexpuffer konnte nicht erstellt werden.');buffers.push(indexBuffer);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices.array,gl.STATIC_DRAW);
      meshes.push({name:sourceMesh.name,role,renderRole,vao,count:indices.spec.count,type:indices.spec.componentType,posBuffer,normalBuffer,originalPos,workingPos,originalNormal,workingNormal,bbox});
    }
  }
  if(Number.isFinite(minFabricX)){fabricBounds={minX:minFabricX,maxX:maxFabricX,minZ:minFabricZ,maxZ:maxFabricZ};clothReferenceBounds={...fabricBounds};}
  gl.bindVertexArray(null);applyParametricGeometry();
}

function applyParametricGeometry(){
  if(!gl||meshes.length===0)return;
  // Metrics depend on the selection, not on the individual vertex.
  const fm = fullMetrics(), hm = halfMetrics(), am = armMetrics();
  const transform = props.model==='vollkassette'
    ? (mesh:MeshGpu,x:number,y:number,z:number)=>fullTransform(mesh,x,y,z,fm)
    : props.model==='halbkassette'
      ? (mesh:MeshGpu,x:number,y:number,z:number)=>halfTransform(mesh,x,y,z,hm)
      : (mesh:MeshGpu,x:number,y:number,z:number)=>armTransform(mesh,x,y,z,am);
  let fminX=Infinity,fmaxX=-Infinity,fminZ=Infinity,fmaxZ=-Infinity;const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(const mesh of meshes){const src=mesh.originalPos,out=mesh.workingPos,nsrc=mesh.originalNormal,nout=mesh.workingNormal;for(let i=0;i<src.length;i+=3){const q=transform(mesh,src[i],src[i+1],src[i+2]);out[i]=q[0];out[i+1]=q[1];out[i+2]=q[2];for(let k=0;k<3;k+=1){min[k]=Math.min(min[k],q[k]);max[k]=Math.max(max[k],q[k]);}let nx=nsrc[i],ny=nsrc[i+1],nz=nsrc[i+2];if(q[3]){const rn=rotateNormalXZ(nx,nz,q[3]);nx=rn[0];nz=rn[1];}nout[i]=nx;nout[i+1]=ny;nout[i+2]=nz;if(mesh.role==='fabric'){fminX=Math.min(fminX,q[0]);fmaxX=Math.max(fmaxX,q[0]);fminZ=Math.min(fminZ,q[2]);fmaxZ=Math.max(fmaxZ,q[2]);}}
    gl.bindBuffer(gl.ARRAY_BUFFER,mesh.posBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,out);gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normalBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,nout);
  }
  if(Number.isFinite(fminX))fabricBounds={minX:fminX,maxX:fmaxX,minZ:fminZ,maxZ:fmaxZ};if(Number.isFinite(min[0]))modelBounds={min,max,center:min.map((v,k)=>(v+max[k])/2),span:min.map((v,k)=>max[k]-v)};requestDraw();
}

async function loadFabricTexture() {
  const requestId = ++textureRequest;
  textureAbort?.abort();
  textureAbort = null;
  disposeTexture();
  requestDraw();
  if (!gl || !props.fabricTexture || disposed) return;
  const controller = new AbortController();
  textureAbort = controller;
  let objectUrl: string | null = null;
  try {
    const response = await fetch(props.fabricTexture, { signal: controller.signal, credentials: 'same-origin' });
    if (!response.ok) throw new Error(`Tuchtextur konnte nicht geladen werden (${response.status}).`);
    const blob = await response.blob();
    if (disposed || requestId !== textureRequest || controller.signal.aborted) return;
    objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.decoding = 'async';
    image.src = objectUrl;
    await image.decode();
    if (!gl || disposed || requestId !== textureRequest || controller.signal.aborted) return;
  disposeTexture();
  const texture = gl.createTexture();
  if (!texture) throw new Error('Stofftextur konnte nicht erstellt werden.');
  activeTexture = texture;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const anisotropic = gl.getExtension('EXT_texture_filter_anisotropic');
  if (anisotropic) {
    const max = Math.min(8, gl.getParameter(anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 1);
    gl.texParameterf(gl.TEXTURE_2D, anisotropic.TEXTURE_MAX_ANISOTROPY_EXT, max);
  }

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.SRGB8_ALPHA8, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
    textureError = '';
    syncMessage();
    requestDraw();
  } catch (cause) {
    if (disposed || requestId !== textureRequest || controller.signal.aborted) return;
    disposeTexture();
    textureError = 'Die gewählte Tuchtextur konnte nicht geladen werden. Bitte „Neu laden“ wählen.';
    syncMessage();
    requestDraw();
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    if (textureAbort === controller) textureAbort = null;
  }
}

function requestDraw() {
  if (disposed || !gl) return;
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(draw);
}

function draw() {
  if (!gl || !program || !canvas || !stage || disposed || meshes.length === 0) return;

  const rect = stage.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2.25);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const aspect = rect.width / Math.max(1, rect.height);
  const target = modelBounds.center;
  const refWidth=props.model==='halbkassette'?2.95:props.model==='gelenkarm'?3.0:3.845,refDepth=props.model==='halbkassette'?2.50:props.model==='gelenkarm'?2.50:3.132;
  const fit = clamp(Math.max((modelBounds.span[0] || refWidth) / refWidth, (modelBounds.span[2] || refDepth) / refDepth), .68, 1.58);
  const radius = Math.max(5.7, 7.7 / aspect) * zoom * fit;
  const eye = [
    target[0] + radius * Math.sin(yaw) * Math.cos(pitch),
    target[1] + radius * Math.sin(pitch),
    target[2] + radius * Math.cos(yaw) * Math.cos(pitch),
  ];

  const mvp = multiply(
    perspective(42 * Math.PI / 180, aspect, 0.05, 100),
    lookAt(eye, target),
  );

  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(program);

  gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uMvp'), false, mvp);
  gl.uniform3fv(gl.getUniformLocation(program, 'uEye'), eye);
  gl.uniform2f(gl.getUniformLocation(program, 'uFabricMin'), fabricBounds.minX, fabricBounds.minZ);
  gl.uniform2f(
    gl.getUniformLocation(program, 'uFabricInvSize'),
    1000 / FABRIC_REFERENCE_WIDTH_MM,
    1000 / FABRIC_REFERENCE_DEPTH_MM,
  );
  gl.uniform1i(gl.getUniformLocation(program, 'uTex'), 0);

  for (const mesh of meshes) {
    gl.bindVertexArray(mesh.vao);
    if (mesh.renderRole === 'fabric') {
      gl.uniform3fv(gl.getUniformLocation(program, 'uColor'), [1, 1, 1]);
      gl.uniform1f(gl.getUniformLocation(program, 'uFabric'), 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, activeTexture);
      gl.uniform1f(gl.getUniformLocation(program, 'uHasTexture'), activeTexture ? 1 : 0);
    } else {
      const frameColor=mesh.renderRole==='white'?'#F6F6F3':props.housingColor;
      gl.uniform3fv(gl.getUniformLocation(program, 'uColor'), hexRgb(frameColor));
      gl.uniform1f(gl.getUniformLocation(program, 'uFabric'), 0);
      gl.uniform1f(gl.getUniformLocation(program, 'uHasTexture'), 0);
    }
    gl.drawElements(gl.TRIANGLES, mesh.count, mesh.type, 0);
  }
  gl.bindVertexArray(null);
}

async function loadModel() {
  const requestId = ++modelRequest;
  modelAbort?.abort();
  textureAbort?.abort();
  textureRequest += 1;
  disposeGpu();
  disposeTexture();
  if (!gl || disposed) return;
  const controller = new AbortController();
  modelAbort = controller;
  modelError = '';
  textureError = '';
  loading = true;
  setCanvasLabel();
  syncMessage();
  try {
    const response = await fetch(modelUrl(), { signal: controller.signal, credentials: 'same-origin' });
    if (!response.ok) throw new Error(`3D-Modell konnte nicht geladen werden (${response.status}).`);
    const buffer = await response.arrayBuffer();
    if (disposed || requestId !== modelRequest || controller.signal.aborted || !gl) return;
    uploadGlb(buffer);
    if (meshes.length === 0) throw new Error('Das 3D-Modell enthält keine darstellbaren Markisenteile.');
    resetView();
    await loadFabricTexture();
    if (disposed || requestId !== modelRequest || controller.signal.aborted) return;
    requestDraw();
  } catch (cause) {
    if (disposed || requestId !== modelRequest || controller.signal.aborted) return;
    disposeGpu();
    modelError = cause instanceof Error ? cause.message : 'Die 3D-Vorschau konnte nicht geladen werden.';
  } finally {
    if (!disposed && requestId === modelRequest) {
      loading = false;
      syncMessage();
    }
    if (modelAbort === controller) modelAbort = null;
  }
}

function setZoom(value: number) {
  if (disposed) return;
  zoom = clamp(value, .48, 2.4);
  requestDraw();
}
function resetView() {
  if (disposed) return;
  yaw = .43;
  pitch = .52;
  zoom = 1;
  requestDraw();
}
function onPointerDown(event: PointerEvent) {
  if (disposed || activePointer !== null) return;
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  if (event.pointerType !== 'mouse' && !interactionEnabled) return;
  dragging = true;
  activePointer = event.pointerId;
  lastX = event.clientX;
  lastY = event.clientY;
  canvas.style.cursor = 'grabbing';
  canvas.setPointerCapture(event.pointerId);
}
function onPointerMove(event: PointerEvent) {
  if (!dragging || activePointer !== event.pointerId || disposed) return;
  yaw -= (event.clientX - lastX) * .008;
  pitch = clamp(pitch + (event.clientY - lastY) * .007, -1.45, 1.45);
  lastX = event.clientX;
  lastY = event.clientY;
  requestDraw();
}
function onPointerUp(event?: PointerEvent) {
  if (event && activePointer !== event.pointerId) return;
  const releasedPointer = activePointer;
  dragging = false;
  activePointer = null;
  if (releasedPointer !== null && canvas.hasPointerCapture(releasedPointer)) canvas.releasePointerCapture(releasedPointer);
  canvas.style.cursor = 'grab';
}
function onWheel(event: WheelEvent) {
  if (disposed || (!interactionEnabled && !event.ctrlKey && !event.metaKey)) return;
  event.preventDefault();
  setZoom(zoom * Math.exp(clamp(event.deltaY, -120, 120) * .0016));
}
function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') { setInteraction(false); return; }
  if (event.key === '+' || event.key === '=') setZoom(zoom / 1.15);
  else if (event.key === '-') setZoom(zoom * 1.15);
  else if (event.key === '0' || event.key === 'Home') resetView();
  else if (event.key === 'ArrowLeft') { yaw -= .12; requestDraw(); }
  else if (event.key === 'ArrowRight') { yaw += .12; requestDraw(); }
  else if (event.key === 'ArrowUp') { pitch = clamp(pitch + .12, -1.45, 1.45); requestDraw(); }
  else if (event.key === 'ArrowDown') { pitch = clamp(pitch - .12, -1.45, 1.45); requestDraw(); }
  else return;
  event.preventDefault();
}

function update(next: Partial<AwningViewerProps>) {
  if (disposed) return;
  const previous = { ...props };
  Object.assign(props, next);
  if (props.model !== previous.model) { void loadModel(); return; }
  if (props.widthMm !== previous.widthMm || props.projectionMm !== previous.projectionMm) applyParametricGeometry();
  if (props.fabricTexture !== previous.fabricTexture) void loadFabricTexture();
  if (props.housingColor !== previous.housingColor) requestDraw();
}
function destroy() {
  if (disposed) return;
  disposed = true;
  modelRequest += 1;
  textureRequest += 1;
  modelAbort?.abort();
  textureAbort?.abort();
  onPointerUp();
  resizeObserver?.disconnect();
  listeners.splice(0).forEach(remove => remove());
  cancelAnimationFrame(raf);
  disposeGpu();
  disposeTexture();
  if (gl && program) gl.deleteProgram(program);
  program = null;
  gl = null;
  stage.remove();
}

listen(canvas, 'pointerdown', onPointerDown as EventListener);
listen(canvas, 'pointermove', onPointerMove as EventListener);
listen(canvas, 'pointerup', onPointerUp as EventListener);
listen(canvas, 'pointercancel', onPointerUp as EventListener);
listen(canvas, 'lostpointercapture', onPointerUp as EventListener);
listen(canvas, 'wheel', onWheel as EventListener, { passive: false });
listen(canvas, 'keydown', onKeyDown as EventListener);
listen(stage, 'keydown', ((event: KeyboardEvent) => {
  if (event.key === 'Escape') setInteraction(false);
}) as EventListener);
listen(canvas, 'webglcontextlost', ((event: Event) => {
  event.preventDefault();
  modelRequest += 1;
  textureRequest += 1;
  modelAbort?.abort();
  textureAbort?.abort();
  cancelAnimationFrame(raf);
  gl = null;
  program = null;
  meshes = [];
  buffers.length = 0;
  vaos.length = 0;
  activeTexture = null;
  loading = false;
  modelError = 'Die 3D-Ansicht wurde vom Browser pausiert. Sie wird nach Wiederherstellung neu geladen.';
  syncMessage();
}) as EventListener);
listen(canvas, 'webglcontextrestored', (() => {
  if (disposed) return;
  try { initWebGl(); void loadModel(); }
  catch (cause) { modelError = cause instanceof Error ? cause.message : 'Die 3D-Ansicht konnte nicht wiederhergestellt werden.'; syncMessage(); }
}) as EventListener);

setInteraction(false);
setCanvasLabel();
try {
  initWebGl();
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(requestDraw);
    resizeObserver.observe(stage);
  } else {
    listen(window, 'resize', requestDraw);
  }
  void loadModel();
} catch (cause) {
  modelError = cause instanceof Error ? cause.message : 'Die 3D-Vorschau ist in diesem Browser nicht verfügbar.';
  syncMessage();
}
return { update, resetView, destroy };
}
