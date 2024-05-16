import { dirname } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { template as data } from '../../_templates.js';
import { replaceTags } from './replace.mjs';
import { createOrUpdatePackage } from './createOrUpdatePackage.mjs';
import { existsSync, mkdirSync } from "node:fs";

const processFile = async (data, filePath, type, ans) => writeFile(replaceTags(filePath, ans), replaceTags(data, ans, type));

/**
 * Get files recursively
 *
 * @param {string} type The extension type
 * @param {string} name The name object
 */
async function createExtension(type, name) {
  recurse(data[type]['php'], type, name, true);
  recurse(data[type]['media'], type, name, false);
  recurse(data['root']['php'], type, name, true);

  createOrUpdatePackage(type, name);
}

async function recurse(parent, type, ans, isPHP) {
  if (!parent || !parent.length) return;
  for (const element of parent) {
    if (element.type === 'directory') {
      const folder = replaceTags(element.path, ans);
      if (!existsSync(folder)) mkdirSync(folder, { recursive: true });;
      if (element.children) recurse(element.children, type, ans, isPHP)
    } else {
      if (!existsSync(replaceTags(dirname(element.path), ans))) mkdirSync(replaceTags(dirname(element.path), ans), { recursive: true });;
      await processFile(
        element.contents,
        replaceTags(element.path, ans),
        type,
        ans,
        isPHP,
      );
    }
  }
}

export { createExtension };
