export const app = {
  publicPath: '/ceres/', language: 'de', defaultLanguage: 'de', activeCurrency: 'EUR',
  urlTrailingSlash: false, templateType: 'content', isSSR: false, isItemView: false,
  isShopBuilder: false, isSearch: false, isCheapestSorting: false,
  useVariationOrderProperties: true, decimalSeparator: ',',
  currencyPattern: { pattern: '#,##0.00 ¤', separator_thousands: '.', separator_decimal: ',', symbols: { EUR: '€' } },
  initialData: { shippingCountries: [{ id: 1, name: 'Deutschland', isoCode2: 'DE' }], shippingCountryId: 1, showNetPrices: false, euShippingCountries: [1] },
  urls: { basket: '/basket', checkout: '/checkout', home: '/', login: '/login', shipping: '/shipping' },
  config: {
    global: { enableOldUrlPattern: false, shippingCostsCategoryId: 0 },
    item: { showPleaseSelect: false, requireOrderProperties: false, itemName: 'name1' },
    currency: { format: 'symbol' },
    log: { data: ['print_errors', 'print_success'], performanceEventPropagation: false },
    basket: { itemData: [], previewType: 'right', showShippingCountrySelect: false, addItemToBasketConfirm: 'preview' },
    header: {}, footer: {}, checkout: {}, search: {}, pagination: {}, contact: {}, seo: {},
  },
};

export const translations = { Ceres: { Template: {
  singleItemAddToBasket: 'In den Warenkorb', singleItemFootnote1: '*', singleItemInclVAT: 'inkl. MwSt.',
  singleItemExclVAT: 'zzgl. MwSt.', singleItemExclusive: 'zzgl.', singleItemShippingCosts: 'Versandkosten',
  singleItemMissingOrderPropertiesError: 'Bitte folgende Angaben ausfüllen: <properties>',
  singleItemPleaseSelectValidVariation: 'Bitte Variante auswählen', singleItemPleaseSelectNotAvailable: 'Nicht verfügbar',
  itemQuantityInput: 'Menge', itemQuantityInputIncrease: 'Menge erhöhen', itemQuantityInputDecrease: 'Menge verringern',
  singleItemQuantityMax: 'Maximal :max', singleItemQuantityMin: 'Mindestens :min',
  singleItemGraduatedPrices: 'Staffelpreise', singleItemMinimumQuantity: 'Ab Menge',
  basketPreview: 'Warenkorb', basket: 'Warenkorb', basketCheckout: 'Zur Kasse', closeIcon: 'Schließen',
  singleItemPropertiesWithoutGroup: 'Weitere Angaben', singleItemAdded: 'Zum Warenkorb hinzugefügt',
  singleItemBasket: 'Warenkorb', singleItemCheckout: 'Zur Kasse',
  basketOops: 'Warenkorb konnte nicht geladen werden', basketPlusAbbr: 'zzgl.',
  itemShowItem: 'Zum Artikel', singleItemContent: 'Inhalt', singleItemUnitPrice: 'Grundpreis',
} } };

export function product(variationId = 1001, { required = false, salable = true, itemId = 100 } = {}) {
  const value = variationId === 1002 ? 749 : 599;
  const properties = required ? [{
    propertyId: 51, surcharge: 25, group: { id: 1, names: { name: 'Montage', description: 'Testangabe' }, orderPropertyGroupingType: 'none' },
    property: { id: 51, position: 1, names: { name: 'Montagehinweis', description: 'Testangabe' },
      valueType: 'text', value: null, isOderProperty: true, isRequired: true, isShownOnItemPage: true,
      isShownAsAdditionalCosts: false, isPreSelected: false, surcharge: 0, vatId: 0 },
  }] : [];
  return {
    id: variationId,
    data: {
      item: { id: itemId, itemType: 'default', manufacturerId: 1 },
      variation: { id: variationId, number: 'QA-' + variationId, minimumOrderQuantity: 1, maximumOrderQuantity: 20, intervalOrderQuantity: 1,
        availability: { id: 1, names: { name: 'Lieferbar' } }, bundleType: null, mayShowUnitPrice: false },
      filter: { isSalable: salable, hasActiveChildren: false },
      texts: { name1: 'Testmarkise ' + variationId, urlPath: 'qa-markise', lang: 'de', description: '<p>Nur lokaler Testartikel.</p>' },
      prices: {
        default: { currency: 'EUR', minimumOrderQuantity: 1, unitPrice: { value, formatted: value + ',00 €' }, price: { value, formatted: value + ',00 €' }, lowestPrice: { value: null, formatted: '' } },
        graduatedPrices: [], rrp: null, specialOffer: null,
      },
      properties, hasOrderProperties: required, hasRequiredOrderProperty: required,
      attributes: [], images: { all: [] }, unit: null, bundleComponents: [], setComponents: [],
    },
  };
}

export function emptyBasket() {
  return { id: 1, sessionId: 'local-qa', currency: 'EUR', itemQuantity: 0, itemSum: 0, itemWishListIds: [],
    basketAmount: 0, basketAmountNet: 0, itemSumNet: 0, shippingAmount: 0, shippingAmountNet: 0,
    couponCode: '', couponDiscount: 0, shippingCountryId: 1, vat: 0, vats: [],
    netShippingAmount: 0, shippingAmountGross: 0, basketRebate: 0, totalVats: 0,
  };
}
