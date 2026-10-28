import test from 'node:test';
import assert from 'node:assert/strict';
import { families, resolveSelection } from '../build-src/catalog.ts';
import { resolveResourceBase, selectionForPageVariation, readPageSelection } from '../build-src/context.ts';

test('current deployed script wins over a stale resource URL in saved ShopBuilder content', () => {
  const current = 'https://cdn.example.test/hash/new/EclipseAwningConfigurator/js/awning-configurator.js?v=1.1.0';
  assert.equal(resolveResourceBase(current, null, 'https://cdn.example.test/old/resources/assets', 'https://shop.example.test/item'),
    'https://cdn.example.test/hash/new/EclipseAwningConfigurator');
});

test('script URL handles relative paths, queries and a same-origin CDN alias', () => {
  assert.equal(resolveResourceBase('/plugins/set-3/EclipseAwningConfigurator/js/awning-configurator.js?v=1.1.0#x', null, null, 'https://shop.example.test/path/item'),
    'https://shop.example.test/plugins/set-3/EclipseAwningConfigurator');
});

test('explicit current base supports combined scripts; legacy assets prefix is only a fallback', () => {
  assert.equal(resolveResourceBase('https://cdn.example.test/all.js', 'https://cdn.example.test/current/resources/', 'https://cdn.example.test/old/assets', 'https://shop.example.test/'),
    'https://cdn.example.test/current/resources');
  assert.equal(resolveResourceBase(null, null, 'https://cdn.example.test/old/assets/', 'https://shop.example.test/'),
    'https://cdn.example.test/old');
  assert.throws(() => resolveResourceBase('javascript:alert(1)', 'data:text/plain,x', null, 'https://shop.example.test/'));
});

test('every original PDP variation initializes the exact matching configurator selection', () => {
  for (const family of families) for (const variant of family.variants) {
    const selection = selectionForPageVariation(variant.itemId, variant.variationId);
    assert(selection);
    assert.equal(selection.model, family.id);
    const result = resolveSelection(selection);
    assert.equal(result.variant.itemId, variant.itemId);
    assert.equal(result.variant.variationId, variant.variationId);
  }
});

test('initial PDP selection requires both IDs, and leaves unknown items on the configured default', () => {
  assert.equal(selectionForPageVariation(610000, 13556), null);
  assert.equal(selectionForPageVariation(999999, 999999), null);
  assert.equal(selectionForPageVariation(NaN, 13556), null);
  const win = { App: { isItemView: true }, ceresStore: { state: { items: { mainItemId: 620001 } }, getters: {
    currentItemVariation: { item: { id: 620001 }, variation: { id: 13556 } },
  } } };
  assert.equal(readPageSelection(win).ready, true);
  assert.equal(resolveSelection(readPageSelection(win).selection).variant.variationId, 13556);
  win.ceresStore.state.items.mainItemId = 610000;
  assert.deepEqual(readPageSelection(win), { ready: false, selection: null });
});

test('lazy native PDP context waits, content pages do not depend on a product context', () => {
  assert.deepEqual(readPageSelection({ App: { isItemView: true }, ceresStore: { state: { items: {} }, getters: {} } }),
    { ready: false, selection: null });
  assert.deepEqual(readPageSelection({ App: { isItemView: false } }), { ready: true, selection: null });
});
