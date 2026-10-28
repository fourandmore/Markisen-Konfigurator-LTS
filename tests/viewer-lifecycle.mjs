import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createAwningViewer } from '../build-src/viewer.ts';

// Dependency-free DOM/GPU harness: verifies loading races, resource disposal,
// pointer/scroll policy, deployed asset URLs and failures without a live shop.
class Element {
  constructor(tag = 'div') {
    this.tagName = tag;
    this.children = [];
    this.listeners = new Map();
    this.attributes = new Map();
    this.style = {};
    this.captures = new Set();
    this.classList = { toggle() {} };
    this._textContent = '';
  }
  get textContent() { return this._textContent + this.children.map(child => child.textContent).join(''); }
  set textContent(value) { this._textContent = String(value); this.children = []; }
  append(...children) { children.forEach(child => this.appendChild(child)); }
  appendChild(child) { this.children.push(child); child.parent = this; return child; }
  replaceChildren(...children) { this.children = []; this.append(...children); }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter(c => c !== this); }
  setAttribute(key, value) { this.attributes.set(key, value); }
  removeAttribute(key) { this.attributes.delete(key); if (key === 'href') delete this.href; }
  addEventListener(type, listener) {
    const group = this.listeners.get(type) || new Set();
    group.add(listener); this.listeners.set(type, group);
  }
  removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }
  dispatch(type, event = {}) { for (const fn of this.listeners.get(type) || []) fn(event); }
  getBoundingClientRect() { return { width: 1280, height: 720 }; }
  getContext() { return activeGpu; }
  setPointerCapture(id) { this.captures.add(id); }
  hasPointerCapture(id) { return this.captures.has(id); }
  releasePointerCapture(id) { this.captures.delete(id); }
}

let activeGpu;
let created = 0;
let deleted = 0;
let uploadCount = 0;
let drawn = 0;
let uploadedArrays = [];
function newGpu() {
  created = deleted = uploadCount = drawn = 0;
  uploadedArrays = [];
  return new Proxy({}, {
    get(target, key) {
      if (key === 'getShaderParameter' || key === 'getProgramParameter') return () => true;
      if (key === 'getExtension') return () => null;
      if (key === 'getUniformLocation') return () => ({});
      if (String(key).startsWith('create')) return () => ({ id: ++created, type: key });
      if (String(key).startsWith('delete')) return resource => { if (resource) deleted += 1; };
      if (key === 'bufferData') return (_target, values) => {
        uploadCount += 1;
        if (values instanceof Float32Array) uploadedArrays.push(values);
      };
      if (key === 'drawElements') return () => { drawn += 1; };
      if (typeof key === 'string' && /^[A-Z0-9_]+$/.test(key)) return target[key] ?? (target[key] = Object.keys(target).length + 1);
      return () => {};
    },
  });
}

globalThis.document = { createElement: tag => new Element(tag), baseURI: 'https://shop.example/markisen/testprodukt' };
globalThis.window = new Element('window');
window.devicePixelRatio = 1;
globalThis.ResizeObserver = class { constructor(fn) { this.fn = fn; } observe() { this.fn(); } disconnect() {} };
globalThis.Image = class { async decode() {} };
const frames = new Map();
let frameId = 0;
globalThis.requestAnimationFrame = fn => {
  const id = ++frameId;
  frames.set(id, setImmediate(() => { frames.delete(id); fn(); }));
  return id;
};
globalThis.cancelAnimationFrame = id => { if (frames.has(id)) clearImmediate(frames.get(id)); frames.delete(id); };

function glb() {
  const positions = new Float32Array([-1, 0, 0, 1, 0, 0, 0, 0, 2]);
  const normals = new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0]);
  const indices = new Uint16Array([0, 1, 2]);
  const data = Buffer.alloc(80);
  Buffer.from(positions.buffer).copy(data, 0);
  Buffer.from(normals.buffer).copy(data, 36);
  Buffer.from(indices.buffer).copy(data, 72);
  const json = Buffer.from(JSON.stringify({
    asset: { version: '2.0' },
    buffers: [{ byteLength: data.length }],
    bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: 36 }, { buffer: 0, byteOffset: 36, byteLength: 36 }, { buffer: 0, byteOffset: 72, byteLength: 6 }],
    accessors: [
      { bufferView: 0, componentType: 5126, count: 3, type: 'VEC3' },
      { bufferView: 1, componentType: 5126, count: 3, type: 'VEC3' },
      { bufferView: 2, componentType: 5123, count: 3, type: 'SCALAR' },
    ],
    meshes: [{ name: 'cloth', extras: { role: 'fabric' }, primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2 }] }],
  }));
  const padded = Buffer.alloc(Math.ceil(json.length / 4) * 4, 32);
  json.copy(padded);
  const out = Buffer.alloc(12 + 8 + padded.length + 8 + data.length);
  out.writeUInt32LE(0x46546c67, 0); out.writeUInt32LE(2, 4); out.writeUInt32LE(out.length, 8);
  out.writeUInt32LE(padded.length, 12); out.writeUInt32LE(0x4e4f534a, 16); padded.copy(out, 20);
  out.writeUInt32LE(data.length, 20 + padded.length); out.writeUInt32LE(0x004e4942, 24 + padded.length); data.copy(out, 28 + padded.length);
  return out;
}
const wait = () => new Promise(resolve => setImmediate(resolve));
async function settle() { for (let i = 0; i < 12; i += 1) await wait(); }
const resourceBase = 'https://cdn.example/plugin/current/EclipseAwningConfigurator';
const modelBase = resourceBase + '/documents/awning-configurator/models/';
const textureBase = resourceBase + '/images/awning-configurator/textures/vollkassette/';
const initial = { model: 'vollkassette', housingColor: '#3D4244', fabricTexture: textureBase + 'test.jpg', widthMm: 4000, projectionMm: 3000 };
const warnings = [];
const originalWarn = console.warn;
console.warn = (...args) => warnings.push(args);

// The last model selection wins even when an older request completes later.
activeGpu = newGpu();
let pending = [];
globalThis.fetch = (url, options) => {
  if (url.endsWith('.jpg')) return Promise.resolve(new Response(new Blob(['texture'])));
  return new Promise(resolve => pending.push({ url, signal: options.signal, resolve }));
};
let host = new Element();
let viewer = createAwningViewer(host, initial, resourceBase + '///');
const stage = host.children[0];
const canvas = stage.children[0];
viewer.update({ model: 'halbkassette', widthMm: 2950, projectionMm: 2500 });
assert.equal(pending.length, 2);
assert.equal(pending[0].signal.aborted, true);
assert.equal(pending[0].url, modelBase + 'vollkassette-6100.glb');
assert.equal(pending[1].url, modelBase + 'halbkassette-2950.glb');
pending[1].resolve(new Response(glb()));
await settle();
assert.equal(uploadCount, 3);
assert.ok(drawn > 0);
pending[0].resolve(new Response(glb()));
await settle();
assert.equal(uploadCount, 3, 'stale model must not allocate GPU buffers');
viewer.update({ widthMm: 3950, projectionMm: 3000 });
for (const array of uploadedArrays) assert.ok(Array.from(array).every(Number.isFinite));

let prevented = false;
canvas.dispatch('wheel', { deltaY: 20, ctrlKey: false, metaKey: false, preventDefault() { prevented = true; } });
assert.equal(prevented, false, 'ordinary page scrolling remains available');
canvas.dispatch('wheel', { deltaY: 20, ctrlKey: true, metaKey: false, preventDefault() { prevented = true; } });
assert.equal(prevented, true, 'modified zoom gesture is handled');

// A late texture response cannot replace the newest fabric selection.
const textures = [];
globalThis.fetch = (url, options) => new Promise(resolve => textures.push({ url, signal: options.signal, resolve }));
viewer.update({ fabricTexture: textureBase + 'first.jpg' });
viewer.update({ fabricTexture: textureBase + 'second.jpg' });
assert.equal(textures[0].signal.aborted, true);
textures[1].resolve(new Response(new Blob(['second'])));
await settle();
const resourcesAfterNewestTexture = created;
textures[0].resolve(new Response(new Blob(['first'])));
await settle();
assert.equal(created, resourcesAfterNewestTexture, 'stale texture must not allocate a GPU texture');

viewer.destroy();
viewer.destroy();
assert.equal(host.children.length, 0);
assert.equal(created, deleted, 'all GPU resources are deleted exactly once');
assert.equal([...canvas.listeners.values()].reduce((n, group) => n + group.size, 0), 0);
assert.equal(frames.size, 0);

// A destroyed instance must not upload pending model bytes.
activeGpu = newGpu(); pending = [];
globalThis.fetch = (url, options) => new Promise(resolve => pending.push({ url, signal: options.signal, resolve }));
host = new Element(); viewer = createAwningViewer(host, initial, resourceBase);
viewer.destroy();
assert.equal(pending[0].signal.aborted, true);
pending[0].resolve(new Response(glb()));
await settle();
assert.equal(uploadCount, 0);
assert.equal(created, deleted);
assert.equal(warnings.length, 0, 'cancelled requests produce no spurious diagnostics');

// HTTP failures expose the actual model URL and status; retry clears stale details.
for (const responseStatus of [404, 503]) {
  activeGpu = newGpu();
  const base = responseStatus === 404 ? resourceBase : '/plugin/EclipseAwningConfigurator';
  const expectedUrl = base + '/documents/awning-configurator/models/vollkassette-6100.glb';
  const requests = [];
  globalThis.fetch = url => {
    requests.push(url);
    return Promise.resolve(new Response('Asset unavailable', { status: responseStatus }));
  };
  host = new Element(); viewer = createAwningViewer(host, initial, base + '/');
  await settle();
  const message = host.children[0].children[1];
  const link = message.children[1];
  assert.equal(requests[0], expectedUrl);
  assert.match(message.textContent, new RegExp('HTTP ' + responseStatus));
  if (responseStatus === 404) assert.match(message.textContent, /nicht gefunden/);
  assert.equal(link.href, new URL(expectedUrl, document.baseURI).href);
  assert.equal(link.textContent, link.href, 'the diagnostic link displays the requested URL');
  assert.equal(link.target, '_blank');
  assert.equal(link.rel, 'noopener noreferrer');
  assert.equal(link.style.display, 'inline');
  assert.match(link.style.cssText, /pointer-events:auto/);
  assert.deepEqual(warnings.at(-1)[1], {
    asset: 'model', model: 'vollkassette', url: expectedUrl, status: responseStatus,
    message: message.children[0].textContent,
  });
  assert.equal(uploadCount, 0, 'failed model responses never allocate mesh buffers');
  globalThis.fetch = url => Promise.resolve(new Response(url.endsWith('.glb') ? glb() : new Blob(['texture'])));
  host.children[0].children[3].children.at(-1).dispatch('click');
  await settle();
  assert.equal(message.textContent, '', 'successful retry removes the previous HTTP error');
  assert.equal(link.style.display, 'none');
  assert.equal(link.href, undefined, 'successful retry removes the stale diagnostic URL');
  assert.equal(uploadCount, 3);
  viewer.destroy();
  assert.equal(created, deleted);
}

// A missing texture shows its own URL without discarding the loaded model.
activeGpu = newGpu();
globalThis.fetch = url => Promise.resolve(url.endsWith('.glb')
  ? new Response(glb()) : new Response('Missing texture', { status: 404 }));
host = new Element(); viewer = createAwningViewer(host, initial, resourceBase);
await settle();
assert.equal(uploadCount, 3);
assert.match(host.children[0].children[1].textContent, /Tuchtextur.*HTTP 404/);
assert.equal(host.children[0].children[1].children[1].href, initial.fabricTexture);
assert.equal(warnings.at(-1)[1].asset, 'texture');
assert.equal(warnings.at(-1)[1].url, initial.fabricTexture);
assert.equal(warnings.at(-1)[1].status, 404);
globalThis.fetch = () => Promise.resolve(new Response(new Blob(['texture'])));
viewer.update({ fabricTexture: textureBase + 'replacement.jpg' });
await settle();
assert.equal(host.children[0].children[1].textContent, '');
assert.equal(uploadCount, 3, 'changing fabric retries only the texture');
viewer.destroy();
assert.equal(created, deleted);

// Invalid model bytes report a visible error without allocating mesh resources.
activeGpu = newGpu();
globalThis.fetch = () => Promise.resolve(new Response(new Uint8Array([1, 2, 3])));
host = new Element(); viewer = createAwningViewer(host, initial, resourceBase);
await settle();
assert.match(host.children[0].children[1].textContent, /GLB/);
assert.equal(uploadCount, 0);
viewer.destroy();
assert.equal(created, deleted);

// A browser without WebGL2 gets a visible, understandable error.
activeGpu = null;
host = new Element(); viewer = createAwningViewer(host, initial, resourceBase);
assert.match(host.children[0].children[1].textContent, /WebGL 2/);
assert.equal(host.children[0].children[1].children[1].style.display, 'none', 'WebGL errors have no misleading asset link');
viewer.destroy();

// Validate the actual shipped assets with their default dimensions.
{
  const cases = [
    ['vollkassette', 'vollkassette-6100.glb', 4000, 3000],
    ['halbkassette', 'halbkassette-2950.glb', 2950, 2500],
    ['gelenkarm', 'gelenkarm-1100.glb', 3000, 2500],
  ];
  for (const [model, filename, widthMm, projectionMm] of cases) {
    const bytes = await readFile(new URL('../resources/documents/awning-configurator/models/' + filename, import.meta.url));
    activeGpu = newGpu();
    const requestedUrls = [];
    globalThis.fetch = url => {
      requestedUrls.push(url);
      return Promise.resolve(new Response(url.endsWith('.glb') ? bytes : new Blob(['texture'])));
    };
    host = new Element(); viewer = createAwningViewer(host, { ...initial, model, widthMm, projectionMm }, resourceBase);
    await settle();
    assert.equal(requestedUrls[0], modelBase + filename, `${model}: documented resource URL`);
    assert.equal(requestedUrls[1], initial.fabricTexture, `${model}: supplied texture URL is unchanged`);
    assert.ok(uploadCount > 0, `${model}: meshes uploaded`);
    assert.ok(drawn > 0, `${model}: meshes drawn`);
    assert.equal(host.children[0].children[1].textContent, '', `${model}: no loading error`);
    viewer.update({ widthMm: widthMm + 1000, projectionMm: projectionMm + 500 });
    for (const array of uploadedArrays) assert.ok(Array.from(array).every(Number.isFinite), `${model}: finite geometry`);
    viewer.destroy();
    assert.equal(created, deleted, `${model}: no leaked GPU resources`);
    console.log(`${model}: ${uploadCount / 3} meshes, source and resized geometry valid`);
  }
}
console.warn = originalWarn;
console.log('Viewer lifecycle: resource URLs, HTTP diagnostics/retry, race cancellation, cleanup, scroll policy and fallback passed.');
