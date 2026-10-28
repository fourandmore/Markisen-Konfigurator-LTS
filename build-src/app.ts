import { families, defaults, resolveSelection } from './catalog.ts';
import type { ModelId, Selection, ResolvedSelection } from './catalog.ts';
import { createAwningViewer } from './viewer.ts';
import { createCommerceController } from './commerce.ts';

let nextInstance = 0;

function node<K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text = ''): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

/** Keep authored Bootstrap content, without executing embedded active content. */
export function renderShopHtml(target: HTMLElement, html: string) {
  const template = document.createElement('template');
  template.innerHTML = typeof html === 'string' ? html : '';
  const tags = new Set('DIV SPAN P A IMG BR HR STRONG EM B I U S SMALL SUP SUB H1 H2 H3 H4 H5 H6 UL OL LI DL DT DD TABLE THEAD TBODY TFOOT TR TH TD CAPTION COLGROUP COL FIGURE FIGCAPTION BLOCKQUOTE PRE CODE DETAILS SUMMARY'.split(' '));
  const attrs = new Set(['class', 'style', 'title', 'alt', 'width', 'height', 'colspan', 'rowspan', 'scope', 'loading', 'decoding', 'href', 'src', 'target', 'rel', 'open', 'start', 'reversed']);
  for (const element of Array.from(template.content.querySelectorAll('*'))) {
    if (!tags.has(element.tagName)) { element.remove(); continue; }
    for (const attr of Array.from(element.attributes)) {
      const name = attr.name.toLowerCase();
      if (!attrs.has(name) && !/^aria-[a-z-]+$/.test(name)) { element.removeAttribute(attr.name); continue; }
      if (name === 'style' && /url\s*\(|expression\s*\(|@import|behavior\s*:|-moz-binding/i.test(attr.value)) element.removeAttribute(attr.name);
      if (name === 'href' || name === 'src') {
        try {
          const url = new URL(attr.value, location.href);
          const safe = ['http:', 'https:'].includes(url.protocol) || (name === 'href' && ['mailto:', 'tel:'].includes(url.protocol));
          if (!safe) element.removeAttribute(attr.name);
        } catch { element.removeAttribute(attr.name); }
      }
    }
    if (element.tagName === 'A' && element.getAttribute('target') === '_blank') element.setAttribute('rel', 'noopener noreferrer');
    if (element.tagName === 'IMG') { element.setAttribute('loading', 'lazy'); element.setAttribute('decoding', 'async'); }
  }
  target.replaceChildren(template.content);
}

function createConfigurator(root: HTMLElement) {
  const instanceId = 'eam-' + (++nextInstance);
  const assetBase = (root.dataset.assetBase || '').replace(/\/+$/, '');
  if (!assetBase) throw new Error('Die Konfigurator-Dateien sind nicht verfügbar.');
  const defaultModel = families.find((family) => family.id === root.dataset.defaultModel)?.id || 'vollkassette';
  const allowModelSwitch = root.dataset.allowModelSwitch !== 'false';
  const showDescription = root.dataset.showDescription !== 'false';
  const showTechnical = root.dataset.showTechnical !== 'false';
  const remembered: Record<ModelId, Selection> = {
    vollkassette: { ...defaults.vollkassette },
    halbkassette: { ...defaults.halbkassette },
    gelenkarm: { ...defaults.gelenkarm },
  };
  let resolved = resolveSelection(remembered[defaultModel]);
  let openPanel: string | null = null;
  let lastVariationId = 0;
  let disposed = false;

  root.classList.add('eam');
  root.setAttribute('aria-label', 'Markisen-Konfigurator');
  const scene = node('div', 'eam-scene');
  const viewerHost = node('div', 'eam-viewer-host');
  const controls = node('div', 'eam-controls');
  const status = node('div', 'eam-availability', 'Verfügbarkeit wird geprüft …');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  scene.append(viewerHost, controls, status);
  const commerceRow = node('div', 'eam-commerce');
  const summary = node('div', 'eam-summary');
  const eyebrow = node('span', 'eam-eyebrow', 'Ihre Konfiguration');
  const summaryName = node('strong', 'eam-summary-name');
  const summaryChoices = node('p', 'eam-summary-choices');
  const summaryNumber = node('p', 'eam-summary-number');
  const productLink = node('a', 'eam-product-link', 'Produktdetails öffnen');
  productLink.hidden = true;
  const notice = node('p', 'eam-selection-notice');
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  notice.hidden = true;
  summary.append(eyebrow, summaryName, summaryChoices, summaryNumber, productLink, notice);
  const commerceHost = node('div', 'eam-commerce-host');
  commerceRow.append(summary, commerceHost);
  const details = node('div', 'eam-details');
  const descriptionBlock = node('details', 'eam-detail');
  const descriptionTitle = node('summary', '', 'Artikelbeschreibung');
  const descriptionContent = node('div', 'eam-shop-content');
  descriptionBlock.append(descriptionTitle, descriptionContent);
  const technicalBlock = node('details', 'eam-detail');
  const technicalTitle = node('summary', '', 'Technische Daten');
  const technicalContent = node('div', 'eam-shop-content');
  technicalBlock.append(technicalTitle, technicalContent);
  descriptionBlock.hidden = true;
  technicalBlock.hidden = true;
  details.hidden = true;
  details.append(descriptionBlock, technicalBlock);
  root.replaceChildren(scene, commerceRow, details);

  function textureUrl(state: ResolvedSelection) {
    return assetBase + '/textures/' + state.selection.model + '/' + state.fabric.file;
  }
  const viewer = createAwningViewer(viewerHost, {
    model: resolved.selection.model, housingColor: resolved.housing.hex,
    fabricTexture: textureUrl(resolved), widthMm: resolved.size.widthMm,
    projectionMm: resolved.size.projectionMm,
  }, assetBase);
  const commerce = createCommerceController(commerceHost, {
    onStatus(message, salable) {
      if (disposed) return;
      status.textContent = message;
      status.classList.toggle('eam-availability--ok', salable);
    },
    onProduct(product, url) {
      if (disposed) return;
      productLink.hidden = !url;
      if (url) productLink.href = url;
      else productLink.removeAttribute('href');
      const description = product?.texts?.description || '';
      const technical = product?.texts?.technicalData || '';
      descriptionBlock.hidden = !showDescription || !description.trim();
      technicalBlock.hidden = !showTechnical || !technical.trim();
      details.hidden = descriptionBlock.hidden && technicalBlock.hidden;
      renderShopHtml(descriptionContent, description);
      renderShopHtml(technicalContent, technical);
    },
  });

  function option(label: string, value: string, selected: boolean, enabled = true, extraClass = '') {
    const button = node('button', 'eam-option ' + extraClass, label);
    button.type = 'button';
    button.dataset.value = value;
    button.disabled = !enabled;
    button.setAttribute('aria-pressed', String(selected));
    button.classList.toggle('is-selected', selected);
    if (!enabled) button.title = 'Für diese Auswahl nicht erhältlich';
    return button;
  }
  function buildPanel(key: string, label: string, currentLabel: string, number: number, optionsClass = '') {
    const panel = node('section', 'eam-panel eam-panel--' + key);
    panel.classList.toggle('is-open', openPanel === key);
    const trigger = node('button', 'eam-panel-trigger');
    trigger.type = 'button';
    trigger.dataset.panel = key;
    trigger.id = instanceId + '-' + key + '-trigger';
    trigger.setAttribute('aria-expanded', String(openPanel === key));
    trigger.setAttribute('aria-controls', instanceId + '-' + key);
    trigger.append(node('span', 'eam-panel-number', String(number).padStart(2, '0')));
    const copy = node('span', 'eam-panel-copy');
    copy.append(node('strong', '', label), node('small', '', currentLabel));
    const plus = node('span', 'eam-panel-plus', openPanel === key ? '−' : '+');
    plus.setAttribute('aria-hidden', 'true');
    trigger.append(copy, plus);
    const body = node('div', 'eam-panel-body ' + optionsClass);
    body.id = instanceId + '-' + key;
    body.hidden = openPanel !== key;
    body.setAttribute('role', 'group');
    body.setAttribute('aria-label', label);
    panel.append(trigger, body);
    controls.appendChild(panel);
    return body;
  }
  function renderControls(focusPanel: string | null = null, focusValue: string | null = null) {
    controls.replaceChildren();
    let position = 0;
    if (allowModelSwitch) {
      const body = buildPanel('model', 'Modell', resolved.family.name, ++position, 'eam-list');
      families.forEach((family) => body.append(option(family.name, family.id, family.id === resolved.selection.model)));
    }
    if (resolved.selection.model === 'halbkassette') {
      const body = buildPanel('operation', 'Bedienung', resolved.selection.operation, ++position, 'eam-size-grid');
      resolved.family.operations.forEach((operation) => body.append(option(operation, operation, operation === resolved.selection.operation)));
    }
    const sizes = buildPanel('size', 'Größe', resolved.size.label, ++position, 'eam-size-grid');
    resolved.family.sizes.forEach((size) => sizes.append(option(size.label, size.key, size.key === resolved.selection.sizeKey, resolved.availableSizeKeys.has(size.key))));
    const housings = buildPanel('housing', 'Gehäuse', resolved.housing.name, ++position, 'eam-swatch-grid eam-housing-grid');
    resolved.family.housings.forEach((housing) => {
      const button = option('', housing.id, housing.id === resolved.selection.housing, resolved.availableHousingIds.has(housing.id), 'eam-swatch');
      button.setAttribute('aria-label', housing.name);
      const swatch = node('span', 'eam-swatch-circle');
      swatch.style.backgroundColor = housing.hex;
      button.append(swatch, node('span', 'eam-swatch-name', housing.name));
      housings.append(button);
    });
    const fabrics = buildPanel('fabric', 'Tuch', resolved.fabric.name, ++position, 'eam-swatch-grid eam-fabric-grid');
    resolved.family.fabrics.forEach((fabric) => {
      const button = option('', fabric.code, fabric.code === resolved.selection.fabric, resolved.availableFabricCodes.has(fabric.code), 'eam-swatch');
      button.setAttribute('aria-label', fabric.name);
      const swatch = node('span', 'eam-swatch-circle');
      const img = node('img');
      img.src = assetBase + '/textures/' + resolved.selection.model + '/' + fabric.file;
      img.alt = '';
      img.loading = 'lazy';
      img.width = 40;
      img.height = 40;
      swatch.appendChild(img);
      button.append(swatch, node('span', 'eam-swatch-name', fabric.name));
      fabrics.append(button);
    });
    scene.classList.toggle('eam-scene--operation', resolved.selection.model === 'halbkassette');
    scene.classList.toggle('eam-scene--fixed-model', !allowModelSwitch);
    if (focusPanel) {
      const target = focusValue
        ? Array.from(controls.querySelectorAll<HTMLButtonElement>('.eam-panel--' + focusPanel + ' [data-value]')).find((button) => button.dataset.value === focusValue && !button.disabled)
        : controls.querySelector<HTMLButtonElement>('[data-panel="' + focusPanel + '"]');
      target?.focus({ preventScroll: true });
    }
  }
  function update(next: Partial<Selection>, focusKey: string | null, value: string | null) {
    const previous = resolved;
    resolved = resolveSelection(next);
    remembered[resolved.selection.model] = { ...resolved.selection };
    renderControls(focusKey, value);
    summaryName.textContent = resolved.family.name;
    summaryChoices.textContent = [resolved.size.label, resolved.housing.name, resolved.fabric.name,
      resolved.selection.model === 'halbkassette' ? resolved.selection.operation : null].filter(Boolean).join(' · ');
    summaryNumber.textContent = resolved.variant ? 'Artikel-Nr. ' + resolved.variant.variationNumber : '';
    root.dataset.selectedVariation = String(resolved.variant?.variationId || '');
    root.dataset.selectedModel = resolved.selection.model;
    const adjusted: string[] = [];
    if (resolved.changed && previous.selection.model === resolved.selection.model) {
      if (next.sizeKey !== resolved.selection.sizeKey) adjusted.push('Größe: ' + resolved.size.label);
      if (next.housing !== resolved.selection.housing) adjusted.push('Gehäuse: ' + resolved.housing.name);
      if (next.fabric !== resolved.selection.fabric) adjusted.push('Tuch: ' + resolved.fabric.name);
    }
    notice.hidden = !adjusted.length;
    notice.textContent = adjusted.length ? 'An die verfügbaren Varianten angepasst: ' + adjusted.join(' · ') : '';
    viewer.update({ model: resolved.selection.model, housingColor: resolved.housing.hex, fabricTexture: textureUrl(resolved), widthMm: resolved.size.widthMm, projectionMm: resolved.size.projectionMm });
    if (lastVariationId !== (resolved.variant?.variationId || 0)) {
      lastVariationId = resolved.variant?.variationId || 0;
      commerce.select(resolved.variant);
    }
    window.dispatchEvent(new CustomEvent('awning:selectionchange', {
      detail: {
        model: resolved.selection.model, operation: resolved.selection.operation,
        size: { ...resolved.size }, housing: resolved.housing.name, fabric: resolved.fabric.name,
        plenty: resolved.variant ? { itemId: resolved.variant.itemId, variationId: resolved.variant.variationId, variationNumber: resolved.variant.variationNumber } : null,
      },
    }));
  }
  function onClick(event: MouseEvent) {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!button || !controls.contains(button) || button.disabled) return;
    if (button.dataset.panel) {
      const key = button.dataset.panel;
      openPanel = openPanel === key ? null : key;
      renderControls(key);
      return;
    }
    const panel = button.closest<HTMLElement>('.eam-panel');
    const key = panel?.querySelector<HTMLButtonElement>('[data-panel]')?.dataset.panel;
    const value = button.dataset.value;
    if (!key || !value) return;
    if (key === 'model') {
      openPanel = null;
      update(remembered[value as ModelId], 'model', null);
      return;
    }
    const property = key === 'size' ? 'sizeKey' : key;
    update({ ...resolved.selection, [property]: value }, key, value);
  }
  function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !openPanel) return;
    const key = openPanel;
    openPanel = null;
    renderControls(key);
  }
  controls.addEventListener('click', onClick);
  controls.addEventListener('keydown', onKeydown);
  update(resolved.selection, null, null);
  return {
    destroy() {
      disposed = true;
      controls.removeEventListener('click', onClick);
      controls.removeEventListener('keydown', onKeydown);
      commerce.destroy();
      viewer.destroy();
    },
  };
}

export function start() {
  const win = window as any;
  if (win.EclipseAwningConfigurator?.started) return;
  const instances = new Map<HTMLElement, ReturnType<typeof createConfigurator>>();
  function mountAll() {
    for (const [root, handle] of instances) {
      if (!root.isConnected) { handle.destroy(); instances.delete(root); }
    }
    document.querySelectorAll<HTMLElement>('[data-eam-root]').forEach((root) => {
      if (instances.has(root)) return;
      if (instances.size) {
        root.textContent = 'Der Markisen-Konfigurator ist bereits weiter oben auf dieser Seite verfügbar.';
        return;
      }
      try { instances.set(root, createConfigurator(root)); }
      catch (error) {
        root.textContent = 'Der Markisen-Konfigurator konnte nicht geladen werden. Bitte laden Sie die Seite neu.';
        console.error('[EclipseAwningConfigurator]', error);
      }
    });
  }
  win.EclipseAwningConfigurator = { version: '1.0.0', started: true, mountAll };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAll, { once: true });
  else mountAll();
  const observer = new MutationObserver((records) => {
    const rootChanged = records.some((record) => [...record.addedNodes, ...record.removedNodes].some((changed) =>
      changed instanceof HTMLElement && (changed.matches('[data-eam-root]') || changed.querySelector('[data-eam-root]'))));
    if (rootChanged) mountAll();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
