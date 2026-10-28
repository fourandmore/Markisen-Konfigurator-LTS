import assert from 'node:assert/strict';
import test from 'node:test';
import { bundlePurchaseIssue, createIsolatedPurchaseStore, extractVariation, hasUsablePrice, installNativeVariation } from '../build-src/commerce.ts';

const expected = { itemId: 7654, variationId: 13556 };
function record(overrides = {}) {
  return {
    id: expected.variationId,
    data: {
      item: { id: expected.itemId, itemType: 'default' },
      variation: { id: expected.variationId, minimumOrderQuantity: 1, bundleType: 'bundle' },
      filter: { isSalable: true },
      hasOrderProperties: true,
      hasRequiredOrderProperty: true,
      properties: [{
        propertyId: 51,
        property: { id: 51, value: null, isOderProperty: true, isRequired: true,
          isShownOnItemPage: true, valueType: 'text', names: { name: 'Montagehinweis' }, surcharge: 20 },
      }],
      prices: {
        default: { currency: 'EUR', price: { value: 1299 }, unitPrice: { value: 1299 },
          lowestPrice: { value: null, formatted: '' } },
        graduatedPrices: [],
      },
      bundleComponents: [{ quantity: 1, data: { variation: { id: 999 } } }],
      ...overrides,
    },
  };
}

test('extracts the exact selected variation from wrapped and unwrapped IO responses', () => {
  const selected = record();
  const other = record({ variation: { id: 1 } });
  assert.equal(extractVariation({ data: { documents: [other, selected] } }, expected), selected);
  assert.equal(extractVariation({ documents: [selected] }, expected), selected);
});

test('keeps complete backend prices, required order properties and bundle metadata intact', () => {
  const selected = record();
  const before = structuredClone(selected);
  const result = extractVariation({ data: { documents: [selected] } }, expected);
  assert.deepEqual(result, before);
  assert.equal(result.data.properties[0].property.isRequired, true);
  assert.equal(result.data.prices.default.price.value, 1299);
  assert.equal(result.data.bundleComponents[0].data.variation.id, 999);
});

test('rejects mismatching article or variation ids, empty search results and missing documents', () => {
  assert.throws(() => extractVariation({ documents: [record({ item: { id: 9 } })] }, expected));
  assert.throws(() => extractVariation({ documents: [record({ variation: { id: 9 } })] }, expected));
  assert.throws(() => extractVariation({ documents: [] }, expected));
  assert.throws(() => extractVariation({ data: true }, expected));
});

test('requires explicit backend saleability and does not convert unavailable variants to buyable ones', () => {
  const unavailable = record({ filter: { isSalable: false } });
  assert.equal(extractVariation({ documents: [unavailable] }, expected).data.filter.isSalable, false);
  for (const filter of [undefined, {}, { isSalable: 'true' }, { isSalable: 1 }]) {
    assert.throws(() => extractVariation({ documents: [record({ filter })] }, expected));
  }
});

test('does not silently discard missing required order-property data', () => {
  assert.throws(() => extractVariation({ documents: [record({ properties: null })] }, expected));
  assert.throws(() => extractVariation({ documents: [record({ properties: [] })] }, expected));
  assert.throws(() => extractVariation({ documents: [record({ properties: undefined,
    hasOrderProperties: false, hasRequiredOrderProperty: true })] }, expected));
  const noProperties = record({ properties: undefined, hasOrderProperties: false, hasRequiredOrderProperty: false });
  assert.deepEqual(extractVariation({ documents: [noProperties] }, expected).data.properties, []);
});

test('accepts a complete numeric live default price, including a valid zero price', () => {
  assert.equal(hasUsablePrice(record().data), true);
  const free = record().data;
  free.prices.default.unitPrice.value = 0;
  free.prices.default.price.value = 0;
  assert.equal(hasUsablePrice(free), true);
});

test('rejects partial default prices before native hasItemDefaultPrice can dereference price.value', () => {
  const missingTotal = record().data;
  delete missingTotal.prices.default.price;
  assert.equal(hasUsablePrice(missingTotal), false);
  const missingUnit = record().data;
  delete missingUnit.prices.default.unitPrice;
  assert.equal(hasUsablePrice(missingUnit), false);
  assert.equal(hasUsablePrice({}), false);
});

test('rejects malformed or negative backend prices instead of coercing them into displayed amounts', () => {
  for (const value of [undefined, null, '', ' ', false, true, -1, 'NaN', Infinity]) {
    const product = record().data;
    product.prices.default.unitPrice.value = value;
    product.prices.default.price.value = value;
    assert.equal(hasUsablePrice(product), false, `accepted ${String(value)}`);
  }
  const noCurrency = record().data;
  noCurrency.prices.default.currency = ' ';
  assert.equal(hasUsablePrice(noCurrency), false);
});

test('permits a package only when the native IO bundle setting retains the parent article', () => {
  for (const bundleSetting of [1, 2, '1', '2']) {
    assert.equal(bundlePurchaseIssue(record().data, { bundleSetting }), null);
  }
  for (const bundleSetting of [0, '0']) {
    assert.equal(bundlePurchaseIssue(record().data, { bundleSetting }), 'native-basket-would-split-bundle');
  }
  for (const bundleSetting of [undefined, null, '', ' ', false, true, 3, '1.0', {}, []]) {
    assert.equal(bundlePurchaseIssue(record().data, { bundleSetting }), 'unverified-native-bundle-setting');
  }
});

test('never treats a component or its inheritance parent as the purchasable package', () => {
  const component = record({ variation: { id: expected.variationId, bundleType: 'bundle_item', parentVariationId: 99999 } });
  for (const bundleSetting of [0, 1, 2, undefined]) {
    assert.equal(bundlePurchaseIssue(component.data, { bundleSetting }), 'catalog-points-to-bundle-component');
  }
  assert.equal(component.data.variation.id, expected.variationId);
  assert.equal(bundlePurchaseIssue(record({ variation: { id: expected.variationId, bundleType: null } }).data, {}), null);
});

test('registers a fresh native article once, then selects it without replacing global main-item or set state', async () => {
  const selected = record();
  const calls = [];
  const state = { items: { mainItemId: 44, isItemSet: false, itemSetId: 0 } };
  const store = {
    state,
    async dispatch(action, payload) {
      calls.push([action, payload]);
      assert.equal(action, 'registerItem');
      state.items[expected.itemId] = { variation: { documents: [payload] }, variationSelect: {} };
    },
    commit(type, payload) { calls.push([type, payload]); },
  };
  await installNativeVariation(store, selected);
  assert.deepEqual(calls.map(([type]) => type), [
    'registerItem', `${expected.itemId}/variationSelect/setIsVariationSelected`,
    `${expected.itemId}/setVariationMarkInvalidProps`,
  ]);
  assert.equal(calls[0][1], selected);
  assert.equal(state.items.mainItemId, 44);
  assert.equal(state.items.isItemSet, false);
  assert.equal(state.items.itemSetId, 0);
});

test('updates an existing article module without re-registering it or invoking URL-changing loadVariation', async () => {
  const selected = record();
  const calls = [];
  const store = {
    state: { items: { [expected.itemId]: { variationSelect: {} }, mainItemId: 44 } },
    dispatch(action) { assert.fail(`Unexpected action ${action}`); },
    commit(type, payload) { calls.push([type, payload]); },
  };
  await installNativeVariation(store, selected);
  assert.deepEqual(calls, [
    [`${expected.itemId}/setVariation`, { documents: [selected] }],
    [`${expected.itemId}/variationSelect/setIsVariationSelected`, true],
    [`${expected.itemId}/setVariationMarkInvalidProps`, false],
  ]);
  assert.equal(store.state.items.mainItemId, 44);
});

// A deliberately small Vuex harness checks the adapter boundary. The separate
// qa/native-vm.mjs suite runs the real compiled Ceres/Vuex/native cart code.
function isolatedRuntime() {
  const calls = [];
  class Store {
    constructor(config) {
      this.config = config;
      this.state = config.state;
      this.state.items = config.modules.items.state;
      for (const [key, module] of Object.entries(config.modules.items.modules)) {
        this.state.items[key] = module.state;
        module.state.variationSelect = module.modules.variationSelect.state;
      }
    }
    commit(type, value) {
      const own = this.config.mutations[type];
      if (own) return own(this.state, value);
      return this.config.modules.items.mutations[type](this.state.items, value);
    }
    dispatch(type, value) { return this.config.actions[type]({}, value); }
  }
  const noGlobalAction = () => assert.fail('An original global/URL-changing action was copied');
  const functions = names => Object.fromEntries(names.map(name => [name, () => undefined]));
  const base = {
    state: () => ({ mainItemId: null, isItemSet: false, itemSetId: 0, setComponentIds: [] }),
    mutations: { setMainItemId(state, id) { state.mainItemId = id; }, setIsAddToBasketLoading() {} },
    getters: functions(['currentItemVariation', 'itemSetTotalPrice', 'itemSetAllVariationSelected']),
    actions: { registerItem: noGlobalAction, initVariation: noGlobalAction, initSetComponents: noGlobalAction },
  };
  const item = {
    namespaced: true,
    state: () => ({ variation: {}, variationCache: {}, variationOrderQuantity: 1 }),
    mutations: functions(['setVariation', 'setVariationOrderQuantity', 'setVariationOrderProperty', 'setVariationPropertySurcharges', 'setVariationMarkInvalidProps']),
    getters: functions(['currentItemVariation', 'variationTotalPrice', 'variationBasePrice', 'variationGraduatedPrice', 'variationGroupedProperties', 'variationMissingProperties']),
    actions: { loadVariation: noGlobalAction },
  };
  const select = {
    namespaced: true, state: () => ({ isVariationSelected: true, attributes: [], variations: [] }),
    mutations: { setIsVariationSelected() {} }, getters: {}, actions: { fetchVariations: noGlobalAction },
  };
  const root = Object.create(Store.prototype);
  root.state = {
    items: { mainItemId: 7654, isItemSet: true, itemSetId: 7654, setComponentIds: [999],
      7654: { variation: { documents: [record()] }, variationOrderQuantity: 4, variationSelect: { isVariationSelected: false } } },
    basket: { items: [], showNetPrices: false, isBasketLoading: false },
  };
  root._modules = { root: { _children: { items: { _rawModule: base, _children: {
    7654: { _rawModule: item, _children: { variationSelect: { _rawModule: select } } },
  } } } } };
  root._actions = { addBasketItem: [{}], loadComponent: [{}] };
  root._mutations = { setIsBasketLoading: [{}] };
  root.dispatch = (type, payload) => { calls.push([type, payload]); return Promise.resolve({ native: true }); };
  root.commit = (type, payload) => {
    calls.push([type, payload]);
    assert.equal(type, 'setIsBasketLoading');
    root.state.basket.isBasketLoading = payload;
  };
  return { root, Vuex: { Store }, calls, base, item, select };
}

test('isolates native PDP item/quantity/property/set state, shares only the actual basket, and omits global item actions', () => {
  const { root, Vuex, calls, base, item, select } = isolatedRuntime();
  const before = structuredClone(root.state.items);
  const local = createIsolatedPurchaseStore(root, Vuex, 'eam_1');
  assert.notEqual(local, root);
  assert.equal(local.state.basket, root.state.basket);
  assert.notEqual(local.state.items, root.state.items);
  assert.equal(local.state.items.mainItemId, 'eam_1');
  assert.equal(local.state.items.isItemSet, false);
  assert.equal(local.state.items.itemSetId, 0);
  assert.deepEqual(local.state.items.setComponentIds, []);
  const itemModule = local.config.modules.items.modules.eam_1;
  assert.equal(local.config.modules.items.actions, undefined);
  assert.equal(itemModule.actions, undefined);
  assert.equal(itemModule.modules.variationSelect.actions, undefined);
  assert.equal(itemModule.getters.variationTotalPrice, item.getters.variationTotalPrice);
  assert.equal(itemModule.mutations.setVariationOrderProperty, item.mutations.setVariationOrderProperty);
  assert.equal(itemModule.modules.variationSelect.mutations.setIsVariationSelected, select.mutations.setIsVariationSelected);
  assert.equal(local.config.modules.items.getters.itemSetTotalPrice, base.getters.itemSetTotalPrice);
  local.state.items.eam_1.variationOrderQuantity = 6;
  local.state.items.eam_1.variation.documents = [record()];
  local.state.items.eam_1.variation.documents[0].data.properties[0].property.value = 'Widget only';
  assert.deepEqual(root.state.items, before);
  assert.deepEqual(calls, []);
  const other = createIsolatedPurchaseStore(root, Vuex, 'eam_2');
  assert.equal(other.state.items.eam_2.variationOrderQuantity, 1);
  assert.deepEqual(other.state.items.eam_2.variation, {});
});

test('forwards the complete native parent/bundle cart payload and upload-loading mutation to the original shop store', async () => {
  const { root, Vuex, calls } = isolatedRuntime();
  const local = createIsolatedPurchaseStore(root, Vuex, 'eam_1');
  const parent = record();
  assert.notEqual(parent.data.variation.id, parent.data.bundleComponents[0].data.variation.id);
  const payload = { variationId: parent.data.variation.id, quantity: 2,
    basketItemOrderParams: [{ propertyId: 51, value: 'Links' }], totalOrderParamsMarkup: 20 };
  assert.deepEqual(await local.dispatch('addBasketItem', payload), { native: true });
  assert.deepEqual(await local.dispatch('loadComponent', 'basket-preview'), { native: true });
  local.commit('setIsBasketLoading', true);
  assert.equal(local.state.basket.isBasketLoading, true);
  assert.deepEqual(calls, [
    ['addBasketItem', payload], ['loadComponent', 'basket-preview'], ['setIsBasketLoading', true],
  ]);
  assert.equal(calls[0][1], payload, 'The native basket object must be forwarded without reconstruction');
  assert.equal(calls[0][1].variationId, expected.variationId);
});

test('refuses an incompatible or uninitialised PDP runtime without changing any original page state', () => {
  const mutations = [
    runtime => { runtime.root._modules = undefined; },
    runtime => { runtime.root.state.items.mainItemId = null; },
    runtime => { runtime.root._modules.root._children.items._children[7654]._rawModule.state = {}; },
    runtime => { delete runtime.root._modules.root._children.items._children[7654]._rawModule.mutations.setVariationOrderProperty; },
    runtime => { delete runtime.root._actions.addBasketItem; },
    runtime => { runtime.Vuex = {}; },
  ];
  for (const mutate of mutations) {
    const runtime = isolatedRuntime();
    mutate(runtime);
    const before = structuredClone(runtime.root.state);
    assert.throws(() => createIsolatedPurchaseStore(runtime.root, runtime.Vuex, 'eam_1'), /Artikelseite/);
    assert.deepEqual(runtime.root.state, before);
    assert.deepEqual(runtime.calls, []);
  }
  const { root, Vuex, calls } = isolatedRuntime();
  assert.throws(() => createIsolatedPurchaseStore(root, Vuex, String(expected.itemId)), /Artikelseite/);
  assert.deepEqual(calls, []);
});
