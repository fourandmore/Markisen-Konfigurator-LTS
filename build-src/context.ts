import { families, resolveSelection } from './catalog.ts';
import type { Selection } from './catalog.ts';

/** Prefer the currently loaded script over URLs baked into saved ShopBuilder HTML. */
export function resolveResourceBase(scriptSrc: string | null, scriptBase: string | null, legacyBase: string | null, pageUrl: string): string {
  const safeUrl = (value: string | null) => {
    if (!value) return null;
    try {
      const url = new URL(value, pageUrl);
      return ['http:', 'https:'].includes(url.protocol) ? url : null;
    } catch { return null; }
  };
  const script = safeUrl(scriptSrc);
  if (script && /\/js\/awning-configurator\.js$/.test(script.pathname)) {
    return new URL('../', script).href.replace(/\/+$/, '');
  }
  const explicit = safeUrl(scriptBase);
  if (explicit) {
    explicit.search = '';
    explicit.hash = '';
    return explicit.href.replace(/\/+$/, '');
  }
  const legacy = safeUrl(legacyBase);
  if (legacy) {
    legacy.search = '';
    legacy.hash = '';
    return legacy.href.replace(/\/+$/, '').replace(/\/assets$/, '');
  }
  throw new Error('Der aktuelle Pfad der Konfigurator-Dateien konnte nicht ermittelt werden.');
}

/** Exact catalog lookup. Product and variation IDs must both match the current PDP. */
export function selectionForPageVariation(itemId: number, variationId: number): Selection | null {
  if (!Number.isSafeInteger(itemId) || !Number.isSafeInteger(variationId) || itemId <= 0 || variationId <= 0) return null;
  for (const family of families) {
    const variant = family.variants.find((entry) => entry.itemId === itemId && entry.variationId === variationId);
    if (!variant) continue;
    const housing = family.housings.find((entry) => entry.name === variant.housing);
    if (!housing) return null;
    const result = resolveSelection({
      model: family.id,
      operation: variant.operation || family.defaultSelection.operation,
      sizeKey: `${variant.widthMm}x${variant.projectionMm}`,
      housing: housing.id,
      fabric: variant.fabricCode,
    });
    return result.variant?.variationId === variationId ? { ...result.selection } : null;
  }
  return null;
}

export function readPageSelection(win: any): { ready: boolean; selection: Selection | null } {
  if (!win.App?.isItemView) return { ready: true, selection: null };
  const store = win.ceresStore;
  const mainItemId = Number(store?.state?.items?.mainItemId);
  let current: any = null;
  try {
    current = store?.getters?.currentItemVariation || (mainItemId > 0 ? store?.getters?.[`${mainItemId}/currentItemVariation`] : null);
  } catch { return { ready: false, selection: null }; }
  const itemId = Number(current?.item?.id);
  const variationId = Number(current?.variation?.id);
  if (!Number.isSafeInteger(itemId) || itemId <= 0 || !Number.isSafeInteger(variationId) || variationId <= 0) {
    return { ready: false, selection: null };
  }
  if (mainItemId > 0 && mainItemId !== itemId) return { ready: false, selection: null };
  return { ready: true, selection: selectionForPageVariation(itemId, variationId) };
}
