import vm from 'node:vm';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { app, translations, product, emptyBasket } from './fixtures.mjs';
import { installNativeVariation, extractVariation, createCommerceController } from '../build-src/commerce.ts';

const reference = resolve(process.env.EAM_CERES_DIST || resolve(import.meta.dirname, '../../reference_lts/ceres/resources/js/dist'));
const events = new Map();
const bodyClasses = new Set();
const document = {
  getElementById: () => ({ value: 'local-qa-token' }),
  body: { classList: { contains: key => bodyClasses.has(key), add: key => bodyClasses.add(key), remove: key => bodyClasses.delete(key) } },
  addEventListener(name, handler) { const list = events.get(name) || []; list.push(handler); events.set(name, list); },
  dispatchEvent(event) { for (const handler of events.get(event.type) || []) handler(event); },
};
class CustomEvent { constructor(type, options = {}) { this.type = type; this.detail = options.detail; } }
const context = vm.createContext({
  window: {}, console, setTimeout, clearTimeout, Promise, Map, Set, WeakMap,
  App: { ...app, isSSR: true }, translations, CustomEvent,
});

// Expose the existing webpack module loader for this test only. Do not change
// any component, Vuex action, getter, compiled template or distribution file.
let bundle = await readFile(resolve(reference, 'ceres-base.js'), 'utf8');
const entry = 'return __webpack_require__(__webpack_require__.s = "./resources/js/src/base.js");';
assert.ok(bundle.includes(entry));
bundle = bundle.replace(entry, 'window.qaRequire = __webpack_require__; return __webpack_require__;');
vm.runInContext(bundle, context);
for (const file of (await readdir(resolve(reference, 'chunks'))).filter(name => /^ceres-\d+\.js$/.test(name))) {
  vm.runInContext(await readFile(resolve(reference, 'chunks', file), 'utf8'), context);
}
const requireModule = context.window.qaRequire;
// Vue is initialised in its official server mode: this suite validates native
// component logic/VNodes, not DOM layout or browser event dispatch.
delete context.window;
const Vue = requireModule('./node_modules/vue/dist/vue.js');
context.Vue = Vue;
const storeModule = requireModule('./resources/js/src/app/store/index.js');
const store = storeModule.createStore();
const api = requireModule('./resources/js/src/app/services/ApiService.js');
const notificationService = requireModule('./resources/js/src/app/services/NotificationService.js');
context.document = document;
context.window = { location: { pathname: '/' } };
Vue.prototype.$ceres = context.App;
Vue.prototype.$translate = requireModule('./resources/js/src/app/services/TranslationService.js').default.translate;
for (const name of ['currency', 'itemCrossPrice', 'itemUrl', 'hasItemDefaultPrice', 'numberFormat', 'propertySurcharge', 'translate', 'graduatedPrice', 'itemPrice']) {
  requireModule('./resources/js/src/app/filters/' + name + '.filter.js');
}

function deferred() {
  let state = 'pending', args;
  const done = [], fail = [];
  const value = {
    done(fn) { if (state === 'resolved') fn(...args); else done.push(fn); return value; },
    fail(fn) { if (state === 'rejected') fn(...args); else fail.push(fn); return value; },
    catch(fn) { return value.fail(fn); },
    resolve(...next) { state = 'resolved'; args = next; done.forEach(fn => fn(...args)); },
    reject(...next) { state = 'rejected'; args = next; fail.forEach(fn => fn(...args)); },
    abort() {},
  };
  return value;
}
const posts = [];
let failNext = false;
context.$ = {
  Deferred: deferred,
  parseJSON: JSON.parse,
  ajax(url, config) {
    const response = deferred();
    assert.match(url, /^\/rest\/io\/basket\/items\/?$/);
    assert.equal(config.method, 'POST');
    const posted = JSON.parse(JSON.stringify(config.data));
    posts.push(posted);
    setImmediate(() => {
      if (failNext) {
        failNext = false;
        response.reject({ status: 409, responseText: JSON.stringify({ data: { exceptionCode: 111, placeholder: {} } }) });
      } else {
        const variation = product(posted.variationId);
        const item = { id: posts.length, variationId: posted.variationId, quantity: posted.quantity, price: variation.data.prices.default.unitPrice.value, variation, basketItemOrderParams: posted.basketItemOrderParams };
        const basket = { ...emptyBasket(), itemQuantity: posted.quantity, itemSum: item.price * posted.quantity };
        response.resolve({ data: item });
        api.triggerEvent('AfterBasketChanged', { basket, basketItems: [item], showNetPrices: false });
        api.triggerEvent('AfterBasketItemAdd', { basketItems: [item] });
      }
    });
    return response;
  },
};
storeModule.initClientListeners(store);
store.commit('setBasket', emptyBasket());
store.commit('setBasketItems', []);

function instantiate(name, props = {}, parent = null) {
  const def = requireModule('./resources/js/src/app/components/' + name + '.vue').default;
  return new Vue({ ...def, parent, store, propsData: props });
}
function texts(node) { return !node ? '' : (node.text || '') + (node.children || []).map(texts).join(''); }
function descendants(node) { return !node ? [] : [node, ...(node.children || []).flatMap(descendants)]; }
const settle = async () => { await Vue.nextTick(); await new Promise(resolve => setImmediate(resolve)); await Vue.nextTick(); };

const first = product(1001, { required: true });
const valid = extractVariation({ data: { documents: [first] } }, { itemId: 100, variationId: 1001 });
await installNativeVariation(store, valid);
const parent = new Vue({ store, provide: { itemId: 100 } });
const price = instantiate('item/ItemPrice', {}, parent);
assert.equal(price.variationTotalPrice, 599);
assert.match(texts(price._render()), /599,00/);
const properties = instantiate('item/OrderPropertyList', {}, parent);
assert.equal(properties.sortedGroupedProperties[0].properties[0].names.name, 'Montagehinweis');
assert.equal(properties.variationMissingProperties.length, 1);

const single = instantiate('item/SingleAddToBasket', {}, parent);
const addVNode = single._render();
const add = new addVNode.componentOptions.Ctor({ parent: single, store, propsData: addVNode.componentOptions.propsData });
assert.equal(add.variationId, 1001);
assert.equal(add.allVariationsSelected, true);
add.addToBasket();
assert.equal(posts.length, 0, 'native required-property validation prevents the POST');
assert.equal(store.state.items[100].variationMarkInvalidProperties, true);
assert.ok(notificationService.getNotifications().all().some(note => /Montagehinweis/.test(note.message)));

store.commit('100/setVariationOrderProperty', { propertyId: 51, value: 'Links' });
await settle();
assert.equal(properties.variationMissingProperties.length, 0);
assert.equal(price.variationTotalPrice, 624, 'native property surcharge updates the price');

const quantityVNode = descendants(add._render()).find(node => node.componentOptions?.tag === 'quantity-input');
assert.ok(quantityVNode);
const quantity = new quantityVNode.componentOptions.Ctor({ parent: add, store, propsData: quantityVNode.componentOptions.propsData });
quantity.$on('quantity-change', value => add.updateQuantity(value));
quantity.increaseValue();
await new Promise(resolve => setTimeout(resolve, 5));
await settle();
assert.equal(add.quantity, 2);
assert.equal(store.state.items[100].variationOrderQuantity, 2);

const preview = instantiate('basket/BasketPreview');
preview.$options.mounted.forEach(fn => fn.call(preview));
add.addToBasket();
await settle();
await new Promise(resolve => setTimeout(resolve, 5));
assert.equal(posts.length, 1);
assert.equal(posts[0].variationId, 1001);
assert.equal(posts[0].quantity, 2);
assert.equal(posts[0].basketItemOrderParams[0].propertyId, 51);
assert.equal(posts[0].basketItemOrderParams[0].value, 'Links');
assert.equal(posts[0].totalOrderParamsMarkup, 25);
assert.equal(posts[0].template, 'Ceres::Basket.Basket');
assert.equal(store.state.basket.items[0].variationId, 1001);
assert.equal(store.state.items.isAddToBasketLoading, 0);
assert.ok(bodyClasses.has('basket-open'), 'official basket-preview reacts to the backend event');

failNext = true;
add.addToBasket();
await settle();
assert.equal(store.state.items.isAddToBasketLoading, 0);
assert.equal(store.state.basket.isBasketLoading, false);
assert.ok(notificationService.getNotifications().all().some(note => note.context === 'danger'));

await installNativeVariation(store, product(1002));
await settle();
assert.equal(price.variationTotalPrice, 749);
assert.match(texts(price._render()), /749,00/);
assert.equal(single.currentVariation.variation.id, 1002);
assert.equal(properties.variationGroupedProperties.length, 0);
assert.equal(store.state.items[100].variationOrderQuantity, 1);
assert.equal(store.state.items[100].variationMarkInvalidProperties, false);
for (const component of [price, properties, single, add, quantity, preview, parent]) component.$destroy();

// Exercise the actual shipped commerce.ts controller against that same native
// store/Vue runtime. The lightweight DOM below only supplies its wrapper nodes;
// Vue's real render functions still generate the purchase component VNodes.
class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.attrs = new Map(); this.listeners = new Map(); }
  append(...children) { this.children.push(...children); }
  appendChild(child) { this.children.push(child); return child; }
  replaceChildren(...children) { this.children = children; }
  setAttribute(key, value) { this.attrs.set(key, value); }
  removeAttribute(key) { this.attrs.delete(key); }
  addEventListener(name, handler) { this.listeners.set(name, handler); }
  removeEventListener(name) { this.listeners.delete(name); }
}
document.createElement = tag => new Element(tag);
globalThis.document = document;
globalThis.CustomEvent = CustomEvent;
globalThis.window = { Vue, ceresStore: store, App: context.App, setTimeout, clearTimeout,
  location: { href: 'http://localhost/qa', origin: 'http://localhost' } };
for (const [tag, name] of [
  ['item-price', 'item/ItemPrice'], ['order-property-list', 'item/OrderPropertyList'],
  ['graduated-prices', 'item/GraduatedPrices'], ['item-availability', 'item/ItemAvailability'],
  ['single-add-to-basket', 'item/SingleAddToBasket'], ['single-item-bundle', 'item/SingleItemBundle'],
]) Vue.component(tag, requireModule('./resources/js/src/app/components/' + name + '.vue').default);
const purchaseInstances = [];
Vue.mixin({ created() { if (this.$options.name === 'EclipseNativePurchase') purchaseInstances.push(this); } });
const gets = [];
let delayRequests = false;
let mismatchedPayload = false;
globalThis.fetch = (url, options) => {
  gets.push({ url, options });
  const variationId = Number(new URL(url).pathname.split('/').filter(Boolean).pop());
  const response = () => new Response(JSON.stringify({ data: { documents: [product(mismatchedPayload ? 9999 : variationId, { itemId: 200 })] } }), { headers: { 'Content-Type': 'application/json' } });
  if (!delayRequests) return Promise.resolve(response());
  return new Promise(resolve => { gets.at(-1).resolve = () => resolve(response()); });
};
const statuses = [];
const products = [];
const host = new Element('host');
const commerce = createCommerceController(host, {
  onStatus: (message, salable) => statuses.push({ message, salable }),
  onProduct: (item, url) => products.push({ item, url }),
});
const waitForSelection = async () => { await new Promise(resolve => setTimeout(resolve, 130)); await settle(); };
commerce.select({ itemId: 200, variationId: 2001 });
await waitForSelection();
assert.equal(store.getters['200/currentItemVariation'].variation.id, 2001);
assert.equal(host.children[1].hidden, false);
assert.equal(statuses.at(-1).salable, true);
assert.equal(products.at(-1).url, 'http://localhost/qa-markise_200_2001');
assert.equal(gets[0].options.headers['X-CSRF-TOKEN'], 'local-qa-token');
assert.equal(gets[0].options.headers['Accept-Language'], 'de');
assert.match(gets[0].url, /template=Ceres%3A%3AItem.SingleItem/);
assert.equal(purchaseInstances.length, 1);
assert.ok(descendants(purchaseInstances[0]._render()).some(node => node.componentOptions?.tag === 'single-add-to-basket'));

delayRequests = true;
commerce.select({ itemId: 200, variationId: 2002 });
await waitForSelection();
const older = gets.at(-1);
commerce.select({ itemId: 200, variationId: 2003 });
await waitForSelection();
const newer = gets.at(-1);
assert.equal(older.options.signal.aborted, true);
newer.resolve(); await settle();
older.resolve(); await settle();
assert.equal(store.getters['200/currentItemVariation'].variation.id, 2003);
assert.equal(purchaseInstances.length, 1, 'same-item choice reuses its native VM');

delayRequests = false;
const beforeUnchanged = gets.length;
store.commit('setShowNetPrices', false);
await waitForSelection();
assert.equal(gets.length, beforeUnchanged, 'unchanged basket context must not reset selection/quantity');
store.commit('setShowNetPrices', true);
await waitForSelection();
assert.equal(gets.length, beforeUnchanged + 1, 'changed price context reloads product');

mismatchedPayload = true;
commerce.select({ itemId: 200, variationId: 2004 });
await waitForSelection();
assert.equal(host.children[1].hidden, true, 'mismatched response cannot expose the stale purchase controls');
assert.equal(statuses.at(-1).salable, false);
assert.equal(store.getters['200/currentItemVariation'].variation.id, 2003);
commerce.destroy();
assert.equal(host.children.length, 0);
assert.equal(purchaseInstances[0]._isDestroyed, true);
console.log(JSON.stringify({
  status: 'passed', vue: Vue.version, nativeStore: true, nativeTemplates: true,
  checks: ['exact selected variant', 'item-price render', 'required properties block POST', 'native surcharge', 'quantity input updates store', 'native basket POST', 'basket event/minicart', 'server failure clears loading', 'same-item variant switch reactivity', 'actual commerce controller mounts native VNodes', 'commerce GET headers/template', 'latest selection wins', 'context-change reload only when necessary', 'mismatched response hidden', 'controller destroys native VM'],
  limitation: 'Vue server-mode component/VNode test; DOM/layout and browser events are not evaluated.',
}, null, 2));
