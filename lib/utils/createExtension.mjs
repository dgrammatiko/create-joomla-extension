import { dirname, sep } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import pkg from 'fs-extra';
import { replaceTags } from './replace.mjs';
import { createOrUpdatePackage } from './createOrUpdatePackage.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const data = require('../templates.json');

const { ensureDir } = pkg;

/**
 * Get files recursively
 *
 * @param {string} type The extension type
 * @param {{}} ans The ans object
 */
async function createExtension(type, ans) {
  let fixedType = type;
  if (type === 'library') fixedType = 'libraries';
  else fixedType = `${type}s`;

  recurse(data[type]['php'], fixedType, ans, true);
  recurse(data[type]['media'], fixedType, ans, false);

  createOrUpdatePackage(type, ans);
}

async function recurse(parent, type, ans, isPHP) {
  for (const folder of parent) {
    if (folder.type === 'directory') {
      if (isPHP) {
        if (existsSync(`src${sep}${type}${sep}${ans.name}${sep}${folder.path}`)) return;
        await ensureDir(`src${sep}${type}${sep}${ans.name}${sep}${folder.path}`);
      } else {
        await ensureDir(fixPath(folder.path, type, ans, false));
      }
      recurse(folder.children, type, ans, isPHP)
    } else {
      if (existsSync(fixPath(dirname(isPHP ? `src${sep}${type}${sep}${ans.name}${sep}${folder.path}` : folder.path), type, ans, isPHP))) return;
      await ensureDir(fixPath(dirname(isPHP ? `src${sep}${type}${sep}${ans.name}${sep}${folder.path}` : folder.path), type, ans, isPHP));
      await processFile(folder.contents, isPHP ? `src${sep}${type}${sep}${ans.name}${sep}${folder.path}` : folder.path, type, ans, isPHP);
    }
  }
}

async function processFile(data, filePath, type, ans, isPHP) {
  await writeFile(fixPath(filePath, type, ans, isPHP), replaceTags(data, ans.name, ans.client));
}

function fixPath(filePath, type, ans, isPHP) {
  let filename;
  switch (type) {
    case 'components':
      filename = isPHP ? filePath.replace(/component\.xml$/, `${ans.name}.xml`) : `media_src${sep}com_${ans.name}${sep}${filePath}`;
      break;
    case 'modules':
      filename = isPHP ? filePath.replace(/module\.xml$/, `mod_${ans.name}.xml`) : `media_src${sep}mod_${ans.name}${sep}${filePath}`;
      break;
    case 'plugins':
      filename = isPHP ? filePath.replace(/plugin\.xml$/, `${ans.name}.xml`) : `media_src${sep}plg_${ans.type}_${ans.name}${sep}${filePath}`;
      break;
    case 'libraries':
      filename = isPHP ? filePath.replace(/library\.xml$/, `${ans.name}.xml`) : `media_src${sep}lib_${ans.name}${sep}${filePath}`;
      break;
    case 'templates':
      filename = isPHP ? filePath : `media_src${sep}templates${sep}${ans.type}${sep}${ans.name}${filePath}`;
      break;
  };
  return filename;
}

export {createExtension};
