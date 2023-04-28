// import { existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { writeFile } from 'node:fs/promises';
import pkg from 'fs-extra';
import { template as data } from '@dgrammatiko/joomla-extension-templates/dist/templates.js';
import { replaceTags } from './replace.mjs';
import { createOrUpdatePackage } from './createOrUpdatePackage.mjs';

const { ensureDir } = pkg;
const processFile = async (data, filePath, type, ans) => writeFile(replaceTags(filePath, ans), replaceTags(data, ans, type));

/**
 * Get files recursively
 *
 * @param {string} type The extension type
 * @param {{}} ans The ans object
 */
async function createExtension(type, ans) {
  recurse(data[type]['php'], type, ans, true);
  recurse(data[type]['media'], type, ans, false);
  recurse(data['root']['php'], type, ans, true);

  createOrUpdatePackage(type, ans);
}

async function recurse(parent, type, ans, isPHP) {
  if (!parent || !parent.length) return;
  for (const element of parent) {
    if (element.type === 'directory') {
      const folder = replaceTags(element.path, ans);
      await ensureDir(folder);
      if (element.children) recurse(element.children, type, ans, isPHP)
    } else {
      await ensureDir(replaceTags(dirname(element.path), ans));
      await processFile(element.contents, replaceTags(element.path, ans), type, ans, isPHP);
    }
  }
}

export {createExtension};
