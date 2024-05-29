import { dirname, extname } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { template as data } from '../../_templates.js';
import { replaceTags } from './replace.mjs';
import { createOrUpdatePackage } from './createOrUpdatePackage.mjs';
import { existsSync, mkdirSync } from "node:fs";

const utfFiles = [".html",".scss",".mjs",".json",".js",".css",".svg",".php",".xml",".ini",".gitignore",".eslintrc",];
const processFile = async (data, filePath, type, ans) => writeFile(
		replaceTags(filePath, ans),
		utfFiles.includes(extname(filePath))
			? replaceTags(data, ans, type)
			: Buffer.from(data, "base64").toString('binary'),
		{ encoding: utfFiles.includes(extname(filePath)) ? "utf8" : "binary" },
	);

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
      if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
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
