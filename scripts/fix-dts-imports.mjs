// Adds explicit `.js` / `/index.js` endings to relative imports in the emitted
// declaration files, so the types resolve under Node's ESM rules (node16/nodenext)
// as well as in bundlers. Also drops side-effect CSS imports, which carry no types
// and point at source files that are not published (the CSS ships in dist/ipe.css).
import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const ROOT = 'dist/types';
const CSS_SIDE_EFFECT = /^import\s+['"][^'"]+\.css['"];?\n/gm;
const SPECIFIER = /(from\s+|import\s*\(\s*|import\s+)(['"])(\.{1,2}\/[^'"]+)\2/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.name.endsWith('.d.ts')) yield path;
  }
}

function withExtension(file, specifier) {
  if (/\.(js|css|json)$/.test(specifier)) return specifier;
  const base = resolve(dirname(file), specifier);
  if (existsSync(`${base}.d.ts`)) return `${specifier}.js`;
  if (existsSync(join(base, 'index.d.ts'))) return `${specifier}/index.js`;
  throw new Error(`Cannot resolve "${specifier}" from ${file}`);
}

let changed = 0;
for await (const file of walk(ROOT)) {
  const source = await readFile(file, 'utf8');
  const next = source.replace(CSS_SIDE_EFFECT, '').replace(SPECIFIER, (_m, lead, quote, spec) => {
    return `${lead}${quote}${withExtension(file, spec)}${quote}`;
  });
  if (next !== source) {
    await writeFile(file, next);
    changed += 1;
  }
}
console.log(`fixed relative imports in ${changed} declaration files`);
