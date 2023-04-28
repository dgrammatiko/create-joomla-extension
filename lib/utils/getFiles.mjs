import { readdir } from 'node:fs/promises';
// import { extname } from 'node:path';

/**
 * Get files recursively
 *
 * @param {string} path The path
 */
async function getFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });

  // Get files within the current directory
  const files = entries
    // .filter(file => (!file.isDirectory() && ['.mjs', '.css'].includes(extname(file.name))))
    .map(file => `${path}${file.name}`);

  // Get folders within the current directory
  const folders = entries.filter(folder => folder.isDirectory());

  for (const folder of folders) {
    // Recursive
    files.push(...await getFiles(`${path}${folder.name}/`));
  }

  return files;
}

export {getFiles};
