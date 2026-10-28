import assert from 'node:assert/strict';
import test from 'node:test';
import { extractVariation, hasUsablePrice, installNativeVariation } from '../build-src/commerce.ts';

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
