/**
 * Native plentyShop LTS purchase adapter. No custom cart endpoint, no client prices.
 * Reference: official Ceres/IO stable 5.0.86, checked 2026-10-28.
 */
import type { Variant } from './catalog.ts';

export interface CommerceOptions {
  onStatus: (message: string, salable: boolean) => void;
  onProduct: (product: any | null, productUrl: string | null) => void;
}
export interface CommerceHandle {
  select: (variant: Variant | null) => void;
  destroy: () => void;
}

export function extractVariation(payload: any, expected: Pick<Variant, 'itemId' | 'variationId'>): any {
  const result = payload && (payload.data || payload);
  const documents = result && result.documents;
  if (!Array.isArray(documents)) throw new Error('Keine Produktdaten erhalten.');
  const document = documents.find((entry: any) =>
    Number(entry?.data?.item?.id) === expected.itemId &&
    Number(entry?.data?.variation?.id) === expected.variationId);
  if (!document) throw new Error('Die gelieferte Variante stimmt nicht mit der Auswahl überein.');
  // Keep all official price, property, availability and bundle metadata intact.
  const data = document.data;
  if (!data.filter || typeof data.filter.isSalable !== 'boolean') {
    throw new Error('Die Bestellbarkeit der Variante konnte nicht geprüft werden.');
  }
  if (!Array.isArray(data.properties)) {
    if (data.hasOrderProperties || data.hasRequiredOrderProperty) {
      throw new Error('Die Bestellmerkmale der Variante fehlen.');
    }
    data.properties = [];
  }
  if (data.hasRequiredOrderProperty && data.properties.length === 0) {
    throw new Error('Die erforderlichen Bestellmerkmale der Variante fehlen.');
  }
  return document;
}

export function hasUsablePrice(product: any): boolean {
  const numericPrice = (value: unknown) =>
    (typeof value === 'number' || (typeof value === 'string' && /^\d+(?:\.\d+)?$/.test(value))) &&
    Number.isFinite(Number(value)) && Number(value) >= 0;
  const price = product?.prices?.default;
  if (!price || !numericPrice(price.unitPrice?.value) || !numericPrice(price.price?.value) ||
    typeof price.currency !== 'string' || !price.currency.trim()) return false;
  for (const kind of ['rrp', 'specialOffer']) {
    const extra = product.prices[kind];
    if (extra && (!numericPrice(extra.unitPrice?.value) || !numericPrice(extra.price?.value))) return false;
  }
  const graduated = product.prices.graduatedPrices;
  if (graduated != null && (!Array.isArray(graduated) || graduated.some((entry: any) =>
    !numericPrice(entry?.unitPrice?.value) || !numericPrice(entry?.price?.value) ||
    !numericPrice(entry?.minimumOrderQuantity)))) return false;
  return true;
}

export async function installNativeVariation(store: any, document: any): Promise<void> {
  const itemId = Number(document.data.item.id);
  if (!store.state.items[itemId]) {
    await store.dispatch('registerItem', document);
  } else {
    store.commit(`${itemId}/setVariation`, { documents: [document] });
  }
  store.commit(`${itemId}/variationSelect/setIsVariationSelected`, true);
  store.commit(`${itemId}/setVariationMarkInvalidProps`, false);
}

export function createCommerceController(host: HTMLElement, options: CommerceOptions): CommerceHandle {
  let sequence = 0;
  let disposed = false;
  let controller: AbortController | null = null;
  let purchaseVm: any = null;
  let mountedItemId = 0;
  let selection: Variant | null = null;
  let debounceTimer = 0;
  let unsubscribeStore: (() => void) | null = null;
  let currentDocument: any = null;
  let contextKey = '';

  const message = document.createElement('div');
  message.className = 'eam-commerce-message';
  message.setAttribute('role', 'status');
  message.setAttribute('aria-live', 'polite');
  const messageText = document.createElement('p');
  const retry = document.createElement('button');
  retry.type = 'button';
  retry.className = 'eam-retry';
  retry.textContent = 'Erneut laden';
  retry.hidden = true;
  const fallback = document.createElement('a');
  fallback.className = 'eam-product-link';
  fallback.textContent = 'Zur Produktseite';
  fallback.hidden = true;
  message.append(messageText, retry, fallback);
  const mount = document.createElement('div');
  mount.className = 'eam-native-mount';
  mount.hidden = true;
  host.replaceChildren(message, mount);

  function runtime() {
    const win = window as any;
    if (!win.Vue || !win.ceresStore || !win.App || !win.Vue.options?.components?.['single-add-to-basket']) {
      throw new Error('Der Kaufbereich ist momentan nicht verfügbar. Bitte laden Sie die Seite neu.');
    }
    return { Vue: win.Vue, store: win.ceresStore, App: win.App };
  }
  function productUrl(product: any): string | null {
    try {
      const filter = (window as any).Vue?.options?.filters?.itemURL;
      const fallbackPath = Number.isSafeInteger(Number(product?.item?.id)) && Number(product.item.id) > 0 &&
        Number.isSafeInteger(Number(product?.variation?.id)) && Number(product.variation.id) > 0
        ? '/' + product.item.id + '_' + product.variation.id : null;
      const result = typeof filter === 'function' ? filter(product) : fallbackPath;
      if (typeof result !== 'string' || !result.trim()) return fallbackPath;
      const url = new URL(result, window.location.href);
      return url.origin === window.location.origin && /^https?:$/.test(url.protocol) ? url.href : null;
    } catch { return null; }
  }
  function showMessage(text: string, canRetry: boolean, url: string | null = null) {
    mount.hidden = true;
    mount.setAttribute('inert', '');
    message.hidden = false;
    messageText.textContent = text;
    retry.hidden = !canRetry;
    fallback.hidden = !url;
    if (url) fallback.href = url;
    else fallback.removeAttribute('href');
  }
  function disposePurchase() {
    if (purchaseVm) {
      purchaseVm.$destroy();
      purchaseVm = null;
    }
    mountedItemId = 0;
    mount.replaceChildren();
  }
  function emitVariationChanged() {
    if (disposed || !currentDocument || Number(currentDocument.data.variation.id) !== selection?.variationId) return;
    document.dispatchEvent(new CustomEvent('onVariationChanged', {
      detail: { itemId: Number(currentDocument.data.item.id), documents: [currentDocument], attributes: currentDocument.data.attributes || [] },
    }));
  }
  function ensureSubscription(store: any) {
    if (unsubscribeStore) return;
    const key = () => JSON.stringify([
      store.state.localization?.shippingCountryId,
      store.state.user?.userData?.id ?? store.state.user?.userData?.contactId ?? null,
      store.state.user?.userData?.classId ?? null,
      store.state.basket?.showNetPrices,
      (window as any).App?.activeCurrency,
    ]);
    contextKey = key();
    unsubscribeStore = store.subscribe((mutation: any) => {
      if (!['setShippingCountryId', 'setUserData', 'setShowNetPrices'].includes(mutation.type)) return;
      const next = key();
      if (next === contextKey) return;
      contextKey = next;
      retrySelection();
    });
  }
  function mountPurchase(itemId: number, Vue: any, store: any, App: any) {
    if (purchaseVm && mountedItemId === itemId) return;
    disposePurchase();
    const point = document.createElement('div');
    mount.appendChild(point);
    purchaseVm = new Vue({
      name: 'EclipseNativePurchase',
      store,
      provide: () => ({ itemId }),
      computed: {
        product() { return this.$store.getters[`${itemId}/currentItemVariation`]; },
        groupedProperties() { return this.$store.getters[`${itemId}/variationGroupedProperties`] || []; },
        netPrices() { return this.$store.state.basket.showNetPrices; },
      },
      methods: {
        translate(key: string, fallbackText: string) {
          try {
            const value = this.$translate('Ceres::Template.' + key);
            return value && value !== 'Ceres::Template.' + key ? value : fallbackText;
          } catch { return fallbackText; }
        },
      },
      errorCaptured(error: any) {
        showMessage('Der Kaufbereich konnte nicht vollständig geladen werden. Bitte versuchen Sie es erneut.', true);
        options.onStatus('Kaufbereich momentan nicht verfügbar', false);
        console.warn('[EclipseAwningConfigurator] Native Kaufkomponente:', error?.message || String(error));
        return false;
      },
      render(h: any) {
        const item = this.product;
        if (!item || !hasUsablePrice(item)) return h('div');
        const blocks: any[] = [];
        blocks.push(h('item-price', { props: { showCrossPrice: true } }));
        blocks.push(h('div', { class: 'eam-tax' }, [
          this.translate('singleItemFootnote1', '*') + ' ',
          this.netPrices
            ? this.translate('singleItemExclVAT', 'zzgl. MwSt.')
            : this.translate('singleItemInclVAT', 'inkl. MwSt.'),
          ' ' + this.translate('singleItemExclusive', 'zzgl.') + ' ',
          Number(App.config?.global?.shippingCostsCategoryId) > 0
            ? h('a', { attrs: { href: '#shippingscosts', 'data-toggle': 'modal' } }, this.translate('singleItemShippingCosts', 'Versandkosten'))
            : h('span', this.translate('singleItemShippingCosts', 'Versandkosten')),
        ]));
        if (item.variation.bundleType === 'bundle') blocks.push(h('single-item-bundle'));
        if (item.filter.isSalable && this.groupedProperties.length) blocks.push(h('order-property-list', {
          on: { 'hook:mounted': emitVariationChanged },
        }));
        if (Array.isArray(item.prices.graduatedPrices)) blocks.push(h('graduated-prices'));
        blocks.push(h('div', { class: 'eam-native-availability' }, [h('item-availability')]));
        blocks.push(h('div', { class: 'eam-native-buy' }, [h('single-add-to-basket', { props: { buttonSize: 'btn-lg' } })]));
        if (!item.filter.isSalable) blocks.push(h('p', { class: 'eam-unavailable' }, 'Diese Variante ist derzeit nicht bestellbar.'));
        return h('div', { class: 'eam-native-purchase' }, blocks);
      },
    }).$mount(point);
    mountedItemId = itemId;
  }

  async function load(current: Variant, requestId: number) {
    let responseUrl: string | null = null;
    try {
      const { Vue, store, App } = runtime();
      ensureSubscription(store);
      if (disposed || requestId !== sequence) return;
      controller = new AbortController();
      const activeController = controller;
      const timeout = window.setTimeout(() => activeController.abort(), 20000);
      let payload: any;
      try {
        const slash = App.urlTrailingSlash ? '/' : '';
        const url = new URL(`/rest/io/variations/${current.variationId}${slash}`, window.location.origin);
        url.searchParams.set('template', 'Ceres::Item.SingleItem');
        if (App.templateType) url.searchParams.set('templateType', App.templateType);
        const headers: Record<string, string> = { Accept: 'application/json', 'Accept-Language': App.language || 'de' };
        const token = (document.getElementById('csrf-token') as HTMLInputElement | null)?.value;
        if (token) headers['X-CSRF-TOKEN'] = token;
        const response = await fetch(url.href, {
          method: 'GET', credentials: 'same-origin', cache: 'no-store',
          headers, signal: activeController.signal,
        });
        if (!response.ok) throw new Error('Produktabfrage fehlgeschlagen (' + response.status + ').');
        payload = await response.json();
      } finally {
        window.clearTimeout(timeout);
      }
      if (disposed || requestId !== sequence) return;
      const itemDocument = extractVariation(payload, current);
      const product = itemDocument.data;
      responseUrl = productUrl(product);
      options.onProduct(product, responseUrl);
      // Item sets have a global LTS context. Never change another item's context.
      if (product.item.itemType === 'set' || store.state.items?.isItemSet || App.isItemView) {
        showMessage('Für diese Auswahl können Sie die Bestellung auf der Produktseite abschließen.', false, responseUrl);
        options.onStatus('Bitte auf der Produktseite fortfahren', false);
        return;
      }
      if (!hasUsablePrice(product)) {
        showMessage('Für diese Variante ist derzeit kein Verkaufspreis verfügbar.', true, responseUrl);
        options.onStatus('Preis derzeit nicht verfügbar', false);
        return;
      }
      // Display-only optional metadata expected by the installed native component.
      if (!product.prices.default.lowestPrice) product.prices.default.lowestPrice = { value: null, formatted: '' };
      currentDocument = itemDocument;
      await installNativeVariation(store, itemDocument);
      if (disposed || requestId !== sequence) return;
      mountPurchase(current.itemId, Vue, store, App);
      await Vue.nextTick();
      if (disposed || requestId !== sequence) return;
      // Existing native property inputs reset on this documented LTS event.
      emitVariationChanged();
      message.hidden = true;
      mount.hidden = false;
      mount.removeAttribute('inert');
      const availability = product.variation.availability?.names?.name;
      options.onStatus(product.filter.isSalable
        ? (availability || 'Bestellbar')
        : (availability ? availability + ' · Derzeit nicht bestellbar' : 'Derzeit nicht bestellbar'), product.filter.isSalable);
    } catch (error: any) {
      if (disposed || requestId !== sequence) return;
      showMessage(error?.name === 'AbortError'
        ? 'Die Produktabfrage hat zu lange gedauert. Bitte versuchen Sie es erneut.'
        : 'Preis und Verfügbarkeit konnten momentan nicht geladen werden. Bitte versuchen Sie es erneut.', true, responseUrl);
      options.onStatus('Verfügbarkeit konnte nicht geladen werden', false);
      options.onProduct(null, null);
      console.warn('[EclipseAwningConfigurator] Produkt konnte nicht geladen werden.', {
        itemId: current.itemId, variationId: current.variationId, message: error?.message || String(error),
      });
    }
  }

  function select(variant: Variant | null) {
    sequence += 1;
    selection = variant;
    currentDocument = null;
    if (controller) controller.abort();
    window.clearTimeout(debounceTimer);
    options.onProduct(null, null);
    if (!variant) {
      showMessage('Diese Kombination ist nicht verfügbar.', false);
      options.onStatus('Diese Kombination ist nicht verfügbar', false);
      return;
    }
    showMessage('Preis und Verfügbarkeit werden geladen …', false);
    options.onStatus('Verfügbarkeit wird geprüft …', false);
    const requestId = sequence;
    // Prevent unnecessary requests while changing several dependent choices.
    debounceTimer = window.setTimeout(() => { void load(variant, requestId); }, 100);
  }
  function retrySelection() { if (selection) select(selection); }
  retry.addEventListener('click', retrySelection);
  try {
    const { store } = runtime();
    ensureSubscription(store);
  } catch { /* The first selection displays the useful error message. */ }
  return {
    select,
    destroy() {
      disposed = true;
      sequence += 1;
      controller?.abort();
      window.clearTimeout(debounceTimer);
      unsubscribeStore?.();
      retry.removeEventListener('click', retrySelection);
      disposePurchase();
      host.replaceChildren();
    },
  };
}
