import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// A fixed local module build, with no npm download and no runtime framework bundle.
// Only the known local module exports/imports are rewritten; this is not a general bundler.
const root = path.dirname(fileURLToPath(import.meta.url));
const plan = [
  ['catalog', 'Catalog', ['families', 'defaults', 'allVariants', 'resolveSelection']],
  ['viewer', 'Viewer', ['createAwningViewer']],
  ['commerce', 'Commerce', ['createCommerceController', 'extractVariation', 'hasUsablePrice', 'installNativeVariation']],
  ['context', 'Context', ['resolveResourceBase', 'selectionForPageVariation', 'readPageSelection']],
  ['app', 'Application', ['start', 'renderShopHtml']],
];
const imports = Object.fromEntries(plan.map(([name, local]) => [name, local]));
const out = ['/* EclipseAwningConfigurator 1.1.0 | Four & More GmbH | built from build-src */', '(function () {', '"use strict";'];
for (const [name, local, exports] of plan) {
  const source = await readFile(path.join(root, 'build-src', name + '.ts'), 'utf8');
  let code = stripTypeScriptTypes(source, { mode: 'strip' });
  code = code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]\.\/([a-z]+)\.ts['"];?/g, (_, names, dependency) => {
    if (!imports[dependency]) throw new Error('Unexpected dependency: ' + dependency);
    return 'const {' + names + '} = ' + imports[dependency] + ';';
  });
  code = code.replace(/^export (?=(?:async )?function |const |let |class )/gm, '');
  if (/^\s*(import|export)\s/m.test(code)) throw new Error('Unresolved module syntax in ' + name);
  out.push('const ' + local + ' = (() => {\n' + code + '\nreturn {' + exports.join(', ') + '};\n})();');
}
out.push('Application.start();', '})();', '');
await mkdir(path.join(root, 'resources/js'), { recursive: true });
await writeFile(path.join(root, 'resources/js/awning-configurator.js'), out.join('\n'));
console.log('Built resources/js/awning-configurator.js');
