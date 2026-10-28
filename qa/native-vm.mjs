import vm from 'node:vm';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { app, translations, product, emptyBasket } from './fixtures.mjs';
import { installNativeVariation, extractVariation, createCommerceController } from '../build-src/commerce.ts';

const reference = resolve(process.env.EAM_CERES_DIST || resolve(import.meta.dirname, '../../reference_lts/ceres/resources/js/dist'));
const events = new Map();
const dispatchedEvents = [];
const bodyClasses = new Set();
const document = {
  getElementById: () => ({ value: 'local-qa-token' }),
  body: { classList: { contains: key => bodyClasses.has(key), add: key => bodyClasses.add(key), remove: key => bodyClasses.delete(key) } },
  addEventListener(name, handler) { const list = events.get(name) || []; list.push(handler); events.set(name, list); },
  dispatchEvent(event) { dispatchedEvents.push(event); for (const handler of events.get(event.type) || []) handler(event); },
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
const Vuex = requireModule('./node_modules/vuex/dist/vuex.esm.js').default;
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
let productForCart = variationId => product(variationId);
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
        const variation = productForCart(posted.variationId);
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
  return new Vue({ ...def, parent, store: parent?.$store || store, propsData: props });
}
function instantiateVNode(node, parent) {
  assert.ok(node?.componentOptions, 'the actual compiled template exposes its native child');
  return new node.componentOptions.Ctor({ parent, store: parent.$store, propsData: node.componentOptions.propsData });
}
function mounted(component) { for (const hook of component.$options.mounted || []) hook.call(component); }
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
globalThis.window = { Vue, Vuex, ceresStore: store, App: context.App, setTimeout, clearTimeout,
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
let productForGet = variationId => product(variationId, { itemId: 200 });
globalThis.fetch = (url, options) => {
  gets.push({ url, options });
  const variationId = Number(new URL(url).pathname.split('/').filter(Boolean).pop());
  const response = () => new Response(JSON.stringify({ data: { documents: [productForGet(mismatchedPayload ? 9999 : variationId)] } }), { headers: { 'Content-Type': 'application/json' } });
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

// Product-detail pages already own a native item context. Exercise a second,
// isolated purchase context with the original Ceres module factories and Vuex.
// Native child VNodes are instantiated explicitly because server-mode Vue does
// not patch a browser DOM. Each controller selection creates a new purchase VM.
function propertyBranch(owner) {
  const list = instantiate('item/OrderPropertyList', {}, owner);
  mounted(list);
  const groupNode = descendants(list._render()).find(node => node.componentOptions?.tag === 'order-property-list-group');
  const group = instantiateVNode(groupNode, list);
  const fieldNode = descendants(group._render()).find(node => node.componentOptions?.tag === 'order-property-list-item');
  const field = instantiateVNode(fieldNode, group);
  mounted(field);
  return { list, group, field, destroy() { [field, group, list].forEach(component => component.$destroy()); } };
}
function purchaseBranch(owner) {
  const price = instantiate('item/ItemPrice', {}, owner);
  const properties = propertyBranch(owner);
  const single = instantiate('item/SingleAddToBasket', {}, owner);
  const add = instantiateVNode(single._render(), single);
  const quantityNode = descendants(add._render()).find(node => node.componentOptions?.tag === 'quantity-input');
  const quantity = instantiateVNode(quantityNode, add);
  quantity.$on('quantity-change', value => add.updateQuantity(value));
  return { price, properties, single, add, quantity,
    destroy() { [quantity, add, single, price].forEach(component => component.$destroy()); properties.destroy(); } };
}
function enterProperty(field, value) {
  const input = descendants(field._render()).find(node => node.tag === 'input' && node.data?.attrs?.type === 'text');
  assert.ok(input?.data?.on?.input, 'native property input contains the original compiled input handlers');
  for (const handler of [].concat(input.data.on.input)) handler({ target: { value, composing: false } });
}
function clone(value) { return JSON.parse(JSON.stringify(value)); }
context.App.isItemView = true;
context.App.templateType = 'singleitem';
context.App.bundleSetting = 1; // Local backend fixture: keep the package parent.
store.commit('setShowNetPrices', false);
// Recreate the earlier test item's native module through the real PDP action.
store.unregisterModule(['items', 100]);
await store.dispatch('initVariation', { documents: [product(1001, { required: true })] });
store.commit('100/setVariationOrderQuantity', 4);
store.commit('100/setVariationOrderProperty', { propertyId: 51, value: 'PDP original' });
const originalPage = new Vue({ store, provide: { itemId: 100 } });
const originalPrice = instantiate('item/ItemPrice', {}, originalPage);
const originalProperties = propertyBranch(originalPage);
originalProperties.field.inputValue = 'Uncommitted PDP text';
originalProperties.list.activeSlide = 2;
assert.equal(store.state.items.mainItemId, 100);
assert.equal(originalPrice.variationTotalPrice, 624);
const originalItems = clone(store.state.items);
const originalUrl = window.location.href;
const originalVariationEvents = dispatchedEvents.filter(event => event.type === 'onVariationChanged').length;
const rootActions = [];
const rootMutations = [];
const unsubscribeActions = store.subscribeAction(action => rootActions.push(action.type));
const unsubscribeMutations = store.subscribe(mutation => rootMutations.push(mutation.type));
function assertPageUnchanged(label) {
  assert.deepEqual(clone(store.state.items), originalItems, label + ': complete original item state is unchanged');
  assert.equal(store.state.items.mainItemId, 100, label + ': original main item remains selected');
  assert.equal(originalPrice.variationTotalPrice, 624, label + ': native page price remains intact');
  assert.equal(originalProperties.field.inputValue, 'Uncommitted PDP text', label + ': native PDP input is untouched');
  assert.equal(originalProperties.list.activeSlide, 2, label + ': native PDP property slider is untouched');
  assert.equal(dispatchedEvents.filter(event => event.type === 'onVariationChanged').length, originalVariationEvents,
    label + ': no global variation-change event is emitted');
  assert.equal(window.location.href, originalUrl, label + ': page URL is unchanged');
  assert.equal(context.App.isItemView, true, label + ': real PDP mode stays enabled');
}
mismatchedPayload = false;
productForGet = variationId => {
  const fixture = product(variationId, { itemId: variationId >= 3000 ? 300 : 100, required: true });
  if (variationId === 3001) {
    fixture.data.variation.bundleType = 'bundle';
    fixture.data.bundleComponents = [
      { ...product(93001, { itemId: 930 }), quantity: 1 },
      { ...product(93002, { itemId: 931 }), quantity: 2 },
    ];
  } else if (variationId === 3002) {
    fixture.data.variation.bundleType = 'bundle_item';
  }
  return fixture;
};
productForCart = productForGet;
const pdpStatuses = [];
const pdpProducts = [];
const pdpHost = new Element('pdp-host');
const pdpCommerce = createCommerceController(pdpHost, {
  onStatus: (message, salable) => pdpStatuses.push({ message, salable }),
  onProduct: (item, url) => pdpProducts.push({ item, url }),
});
const purchasesBeforePdp = purchaseInstances.length;
pdpCommerce.select({ itemId: 100, variationId: 1002 });
await waitForSelection();
assert.equal(pdpHost.children[1].hidden, false, 'a PDP gets working native purchase controls');
assert.equal(pdpStatuses.at(-1).salable, true);
assert.equal(purchaseInstances.length, purchasesBeforePdp + 1);
const pdpPurchase = purchaseInstances.at(-1);
const privateStore = pdpPurchase.$store;
const scope = pdpPurchase._provided.itemId;
assert.notEqual(privateStore, store, 'PDP configuration has its own genuine Vuex store');
assert.ok(privateStore instanceof Vuex.Store);
assert.match(scope, /^eam_\d+$/);
assert.equal(privateStore.state.basket, store.state.basket, 'native basket state remains shared');
assert.equal(privateStore.getters[`${scope}/currentItemVariation`].item.id, 100);
assert.equal(privateStore.getters[`${scope}/currentItemVariation`].variation.id, 1002);
assert.equal(pdpProducts.at(-1).url, 'http://localhost/qa-markise_100_1002');
assertPageUnchanged('select same-item alternate variant');
const localPurchase = purchaseBranch(pdpPurchase);
assert.equal(localPurchase.price.variationTotalPrice, 749);
assert.match(texts(localPurchase.price._render()), /749,00/);
assert.equal(localPurchase.single.currentVariation.variation.id, 1002);
assert.equal(localPurchase.add.variationId, 1002);
assert.equal(localPurchase.add.itemId, scope);
assert.equal(localPurchase.add.allVariationsSelected, true);
assert.equal(localPurchase.properties.field.itemId, scope);
const beforeRequired = posts.length;
localPurchase.add.addToBasket();
await settle();
assert.equal(posts.length, beforeRequired, 'native required property prevents a PDP configuration POST');
assert.equal(privateStore.state.items[scope].variationMarkInvalidProperties, true);
assertPageUnchanged('required-property rejection');
enterProperty(localPurchase.properties.field, 'Motor rechts');
await settle();
assert.equal(localPurchase.properties.list.variationMissingProperties.length, 0);
assert.equal(localPurchase.price.variationTotalPrice, 774, 'genuine native price reacts to the isolated surcharge');
assert.match(texts(localPurchase.price._render()), /774,00/);
localPurchase.quantity.increaseValue();
await new Promise(resolve => setTimeout(resolve, 5));
await settle();
assert.equal(localPurchase.add.quantity, 2);
assert.equal(privateStore.state.items[scope].variationOrderQuantity, 2);
assertPageUnchanged('isolated property and quantity changes');
bodyClasses.delete('basket-open');
localPurchase.add.addToBasket();
await settle();
await new Promise(resolve => setTimeout(resolve, 5));
const pdpPost = posts.at(-1);
assert.equal(posts.length, beforeRequired + 1);
assert.equal(pdpPost.variationId, 1002);
assert.equal(pdpPost.quantity, 2);
assert.equal(pdpPost.basketItemOrderParams[0].propertyId, 51);
assert.equal(pdpPost.basketItemOrderParams[0].value, 'Motor rechts');
assert.equal(pdpPost.totalOrderParamsMarkup, 25);
assert.equal(pdpPost.template, 'Ceres::Basket.Basket');
assert.equal(store.state.basket.items[0].variationId, 1002);
assert.equal(store.state.basket.items[0].quantity, 2);
assert.equal(privateStore.state.items[scope].isAddToBasketLoading, undefined);
assert.equal(privateStore.state.items.isAddToBasketLoading, 0);
assert.equal(store.state.basket.isBasketLoading, false);
assert.ok(bodyClasses.has('basket-open'), 'existing native minicart observes isolated native purchase');
assert.ok(rootActions.includes('addBasketItem'), 'the original global basket action sends the POST');
assert.ok(rootActions.includes('loadComponent'), 'native overlay loading is delegated to the original store');
assertPageUnchanged('successful native PDP basket POST');
failNext = true;
localPurchase.add.addToBasket();
await settle();
assert.equal(privateStore.state.items.isAddToBasketLoading, 0);
assert.equal(store.state.basket.isBasketLoading, false);
assert.equal(store.state.basket.items[0].variationId, 1002);
assertPageUnchanged('failed native PDP basket POST');

// Another model/item receives fresh local modules; original PDP modules are
// neither registered again nor used for the alternate selected product.
pdpCommerce.select({ itemId: 300, variationId: 3001 });
await waitForSelection();
const otherPurchase = purchaseInstances.at(-1);
const otherStore = otherPurchase.$store;
const otherScope = otherPurchase._provided.itemId;
assert.equal(pdpPurchase._isDestroyed, true);
assert.notEqual(otherStore, privateStore);
assert.notEqual(otherScope, scope);
assert.equal(otherStore.getters[`${otherScope}/currentItemVariation`].item.id, 300);
assert.equal(otherStore.getters[`${otherScope}/currentItemVariation`].variation.id, 3001);
assert.equal(otherStore.state.items[otherScope].variationOrderQuantity, 1);
assert.equal(otherStore.state.items[otherScope].variationMarkInvalidProperties, false);
assert.equal(store.state.items[300], undefined);
assert.equal(store.state.items[scope], undefined);
assertPageUnchanged('model/item switch');
const otherBranch = purchaseBranch(otherPurchase);
assert.equal(otherBranch.price.variationTotalPrice, 599);
assert.equal(otherBranch.properties.list.variationMissingProperties.length, 1);
assert.ok(descendants(otherPurchase._render()).some(node => node.componentOptions?.tag === 'single-item-bundle'),
  'a package exposes the native bundle component in the purchase UI');
const nativeBundle = instantiate('item/SingleItemBundle', {}, otherPurchase);
assert.equal(nativeBundle.bundleType, 'bundle');
assert.deepEqual(clone(nativeBundle.bundleComponents.map(component => component.data.variation.id)), [93001, 93002]);
enterProperty(otherBranch.properties.field, 'Andere Markise');
await settle();
const beforeBundlePost = posts.length;
otherBranch.add.addToBasket();
await settle();
assert.equal(posts.length, beforeBundlePost + 1, 'the package sends exactly one native parent POST');
assert.equal(posts.at(-1).variationId, 3001);
assert.equal(posts.at(-1).quantity, 1);
assert.equal(posts.at(-1).basketItemOrderParams[0].value, 'Andere Markise');
assert.equal(posts.at(-1).totalOrderParamsMarkup, 25);
assert.ok(!posts.slice(beforeBundlePost).some(post => [93001, 93002].includes(post.variationId)),
  'neither package component is independently sent to the cart');
assert.equal(store.state.basket.items[0].variationId, 3001);
assert.equal(store.state.basket.items[0].variation.data.item.id, 300);
assertPageUnchanged('alternate model native basket POST');
privateStore.commit(`${scope}/setVariationOrderProperty`, { propertyId: 51, value: 'Late former selection callback' });
await settle();
assert.equal(otherStore.getters[`${otherScope}/currentItemVariation`].properties[0].property.value, 'Andere Markise',
  'late callbacks belonging to an old private store cannot affect the next selection');
assertPageUnchanged('late old-selection callback');
assert.ok(!rootActions.some(type => type === 'registerItem' || type.endsWith('/loadVariation')),
  'isolated native purchase never delegates item registration or URL-changing variation loading');
assert.ok(!rootMutations.some(type => type === 'setMainItemId' || type.startsWith('100/')),
  'original PDP item mutations are not emitted');
localPurchase.destroy();
otherBranch.destroy();
nativeBundle.$destroy();

// The other supported native backend mode also sends the selected parent once,
// while the standard bundle component may additionally display its contents.
context.App.bundleSetting = 2;
pdpCommerce.select({ itemId: 300, variationId: 3001 });
await waitForSelection();
const packageModeTwoPurchase = purchaseInstances.at(-1);
assert.equal(otherPurchase._isDestroyed, true);
assert.notEqual(packageModeTwoPurchase, otherPurchase);
assert.equal(pdpHost.children[1].hidden, false);
const packageModeTwo = purchaseBranch(packageModeTwoPurchase);
const modeTwoBundle = instantiate('item/SingleItemBundle', {}, packageModeTwoPurchase);
const modeTwoContents = instantiateVNode(modeTwoBundle._render(), modeTwoBundle);
assert.equal(modeTwoContents.showItemBundleItems, true);
assert.equal(modeTwoContents.bundleComponents.length, 2);
enterProperty(packageModeTwo.properties.field, 'Paketmodus zwei');
for (let i = 0; i < 2; i += 1) {
  packageModeTwo.quantity.increaseValue();
  await new Promise(resolve => setTimeout(resolve, 5));
  await settle();
}
assert.equal(packageModeTwo.add.quantity, 3);
const beforeModeTwoPost = posts.length;
packageModeTwo.add.addToBasket();
await settle();
assert.equal(posts.length, beforeModeTwoPost + 1, 'bundle mode 2 sends exactly one native POST');
assert.equal(posts.at(-1).variationId, 3001, 'bundle mode 2 submits the selected package parent');
assert.equal(posts.at(-1).quantity, 3);
assert.equal(posts.at(-1).basketItemOrderParams[0].propertyId, 51);
assert.equal(posts.at(-1).basketItemOrderParams[0].value, 'Paketmodus zwei');
assert.equal(posts.at(-1).totalOrderParamsMarkup, 25);
assert.equal(posts.at(-1).template, 'Ceres::Basket.Basket');
assert.ok(!posts.slice(beforeModeTwoPost).some(post => [93001, 93002].includes(post.variationId)));
assert.equal(store.state.basket.items[0].variationId, 3001);
assert.equal(store.state.basket.items[0].quantity, 3);
assertPageUnchanged('bundle setting 2 parent purchase');
packageModeTwo.destroy();
modeTwoContents.$destroy();
modeTwoBundle.$destroy();
pdpCommerce.destroy();
assert.equal(otherPurchase._isDestroyed, true);
assert.equal(packageModeTwoPurchase._isDestroyed, true);
assert.equal(pdpHost.children.length, 0);
assertPageUnchanged('controller destruction');

// A known component-only backend setting, unknown setting, or an explicitly
// selected bundle component must not produce a misleading parent purchase UI.
const rejectedHost = new Element('rejected-package-host');
const rejectedStatuses = [];
const rejectedController = createCommerceController(rejectedHost, {
  onStatus: (message, salable) => rejectedStatuses.push({ message, salable }), onProduct() {},
});
const beforeRejectedPosts = posts.length;
const beforeRejectedPurchases = purchaseInstances.length;
for (const [bundleSetting, variationId, label] of [
  [0, 3001, 'component-only server configuration'],
  [undefined, 3001, 'unknown bundle configuration'],
  [1, 3002, 'selected package component'],
]) {
  context.App.bundleSetting = bundleSetting;
  rejectedController.select({ itemId: 300, variationId });
  await waitForSelection();
  assert.equal(rejectedHost.children[1].hidden, true, label + ': native purchase is hidden');
  assert.equal(rejectedStatuses.at(-1).salable, false, label + ': no salable purchase status');
  assert.equal(purchaseInstances.length, beforeRejectedPurchases, label + ': no purchase VM is created');
  assert.equal(posts.length, beforeRejectedPosts, label + ': no cart POST is sent');
  assertPageUnchanged(label);
}
context.App.bundleSetting = 1;
rejectedController.destroy();

// Unsupported native module metadata must expose a fallback, never a purchase
// that silently mutates the page's product. Only QA metadata is temporarily absent.
const itemModule = store._modules.root._children.items;
const rawChildren = itemModule._children;
itemModule._children = {};
const unavailableHost = new Element('unavailable-pdp-host');
const unavailableStatuses = [];
const unavailablePurchaseCount = purchaseInstances.length;
const unavailableCommerce = createCommerceController(unavailableHost, {
  onStatus: (message, salable) => unavailableStatuses.push({ message, salable }),
  onProduct() {},
});
try {
  unavailableCommerce.select({ itemId: 100, variationId: 1002 });
  await waitForSelection();
  assert.equal(unavailableHost.children[1].hidden, true);
  assert.equal(unavailableStatuses.at(-1).salable, false);
  assert.match(unavailableStatuses.at(-1).message, /Artikelseite.*nicht verfügbar/);
  assert.equal(purchaseInstances.length, unavailablePurchaseCount);
  assert.equal(unavailableHost.children[0].children[2].href, 'http://localhost/qa-markise_100_1002');
  assert.equal(unavailableHost.children[0].children[2].hidden, false);
  assertPageUnchanged('missing native metadata fallback');
} finally {
  unavailableCommerce.destroy();
  itemModule._children = rawChildren;
}
unsubscribeActions();
unsubscribeMutations();
originalProperties.destroy();
originalPrice.$destroy();
originalPage.$destroy();
console.log(JSON.stringify({
  status: 'passed', vue: Vue.version, nativeStore: true, nativeTemplates: true, pdpIsolatedStore: true,
  parentPurchaseBundleSettings: [1, 2],
  checks: ['exact selected variant', 'item-price render', 'required properties block POST', 'native surcharge', 'quantity input updates store', 'native basket POST', 'basket event/minicart', 'server failure clears loading', 'same-item variant switch reactivity', 'actual commerce controller mounts native VNodes', 'commerce GET headers/template', 'latest selection wins', 'context-change reload only when necessary', 'mismatched response hidden', 'controller destroys native VM', 'PDP exact selection uses private Vuex modules', 'native PDP property input and price reactivity', 'native PDP quantity and required validation', 'global basket action and minicart from private context', 'PDP failure clears loading', 'alternate model exact native basket payload', 'package sends one parent POST, never component-only POSTs', 'component-only and unknown bundle settings fail closed', 'selected bundle component fails closed', 'original PDP item/quantity/properties/main item preserved', 'no global variation event or URL change', 'late old-selection callbacks isolated', 'missing native module metadata fails closed'],
  limitation: 'Vue server-mode component/VNode test; DOM/layout and browser events are not evaluated. IO responses are local fixtures; real backend package splitting is not simulated.',
}, null, 2));
