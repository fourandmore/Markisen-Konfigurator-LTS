import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { families, defaults, allVariants, resolveSelection } from '../build-src/catalog.ts';

// Fingerprints calculated independently from the three original PWA data files.
// These include every original ID, variation number, label, dimension and record order.
const sourceRecords = {
  vollkassette: { count: 211, sha256: 'd3b64c24363b44f66a51863c923fec26c955b5a88c22083a3fb0173d0bcc8830' },
  halbkassette: { count: 80, sha256: 'c798c043c1f0cee155b9123e6b57cf696dc147794d6bfb59a5a6ba7ee44475a7' },
  gelenkarm: { count: 8, sha256: '3ec1aafb410134f145a3bfa5c811f941379c26119fe977536c7be65a20ac19e0' },
};

test('all 299 original records are byte-equivalent after canonical JSON serialization', () => {
  assert.equal(allVariants.length, 299);
  assert.equal(new Set(allVariants.map((variant) => variant.variationId)).size, 299);
  for (const family of families) {
    assert.equal(family.variants.length, sourceRecords[family.id].count);
    const fingerprint = createHash('sha256').update(JSON.stringify(family.variants)).digest('hex');
    assert.equal(fingerprint, sourceRecords[family.id].sha256, family.id);
  }
});

test('every source combination resolves to its exact original Plenty item and variation', () => {
  let checked = 0;
  for (const family of families) {
    for (const variant of family.variants) {
      const input = {
        model: family.id,
        operation: variant.operation || family.defaultSelection.operation,
        sizeKey: `${variant.widthMm}x${variant.projectionMm}`,
        housing: family.housings.find((option) => option.name === variant.housing).id,
        fabric: variant.fabricCode,
      };
      const result = resolveSelection(input);
      assert.deepEqual(result.selection, input);
      assert.equal(result.changed, false);
      assert.deepEqual(result.variant, variant);
      assert.equal(result.size.widthMm, variant.widthMm);
      assert.equal(result.size.projectionMm, variant.projectionMm);
      assert.equal(result.fabric.code, variant.fabricCode);
      assert(result.availableSizeKeys.has(input.sizeKey));
      assert(result.availableHousingIds.has(input.housing));
      assert(result.availableFabricCodes.has(input.fabric));
      checked += 1;
    }
  }
  assert.equal(checked, 299);
});

test('all offered option paths normalize to an existing source variant', () => {
  let checked = 0;
  for (const family of families) {
    for (const operation of family.operations) {
      for (const size of family.sizes) {
        for (const housing of family.housings) {
          for (const fabric of family.fabrics) {
            const result = resolveSelection({ model: family.id, operation,
              sizeKey: size.key, housing: housing.id, fabric: fabric.code });
            assert(result.variant, `No variant for ${JSON.stringify(result.selection)}`);
            assert(family.variants.includes(result.variant));
            assert.equal(result.variant.housing, result.housing.name);
            assert.equal(result.variant.fabricCode, result.fabric.code);
            assert.equal(result.variant.widthMm, result.size.widthMm);
            assert.equal(result.variant.projectionMm, result.size.projectionMm);
            if (result.variant.operation) assert.equal(result.variant.operation, result.selection.operation);
            checked += 1;
          }
        }
      }
    }
  }
  assert.equal(checked, 464);
});

test('5.6 m basalt full cassette never offers or resolves to Sand', () => {
  const result = resolveSelection({ model: 'vollkassette', sizeKey: '5600x3500',
    housing: 'basalt', fabric: 'A1010' });
  assert.equal(result.availableFabricCodes.has('A1010'), false);
  assert.notEqual(result.variant.fabricCode, 'A1010');
  assert.equal(result.variant.variationId, 14228);
  assert.equal(result.changed, true);
});

test('half cassette Standard excludes 4.5/5 m and falls back to the nearest supported 3.95 m size', () => {
  const electric = resolveSelection({ model: 'halbkassette', operation: 'Elektrisch',
    sizeKey: '5000x3000', housing: 'white', fabric: 'A1014' });
  assert.equal(electric.selection.sizeKey, '5000x3000');
  assert.equal(electric.variant.variationId, 14765);
  const standard = resolveSelection({ ...electric.selection, operation: 'Standard' });
  assert.equal(standard.selection.sizeKey, '3950x3000');
  assert.equal(standard.availableSizeKeys.has('4500x3000'), false);
  assert.equal(standard.availableSizeKeys.has('5000x3000'), false);
  assert.equal(standard.variant.variationId, 14367);
  assert.equal(standard.changed, true);
});

test('Step 16 fabric corrections and all 23 family-specific swatches are preserved', () => {
  assert.equal(families.reduce((sum, family) => sum + family.fabrics.length, 0), 23);
  const full = families.find((family) => family.id === 'vollkassette');
  const apple = full.fabrics.find((fabric) => fabric.code === 'A1025');
  const pebble = full.fabrics.find((fabric) => fabric.code === 'AP2025');
  const sand = full.fabrics.find((fabric) => fabric.code === 'A1010');
  assert.deepEqual(apple, { code: 'A1025', name: 'Apfel', file: 'a1025-apfel-e0086f72665c.jpg' });
  assert.equal(pebble.name, 'Kiesel');
  assert.equal(pebble.file, 'kieselfarbe.jpg');
  assert.equal(sand.name, 'Sand');
  assert.notEqual(apple.file, pebble.file);
  assert.notEqual(sand.file, pebble.file);
});

test('original defaults select the original three source variants without mutating the caller', () => {
  const expected = { vollkassette: 13556, halbkassette: 14363, gelenkarm: 12456 };
  for (const family of families) {
    const input = Object.freeze({ ...defaults[family.id] });
    const result = resolveSelection(input);
    assert.equal(result.variant.variationId, expected[family.id]);
    assert.deepEqual(input, defaults[family.id]);
    assert.equal(result.changed, false);
  }
});

test('unknown input cannot create a phantom family, housing, fabric or operation', () => {
  const result = resolveSelection({ model: 'unknown', operation: 'Funk',
    sizeKey: '9999x9999', housing: 'violet', fabric: 'not-a-fabric' });
  assert.equal(result.selection.model, 'vollkassette');
  assert.equal(result.selection.operation, 'Elektrisch');
  assert(result.variant);
  assert(families[0].variants.includes(result.variant));
  assert.equal(result.changed, true);
});
