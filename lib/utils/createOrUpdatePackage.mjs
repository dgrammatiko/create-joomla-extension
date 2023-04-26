import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { getVersion } from './getPkgVersion.mjs'

const devDependencies = [
  // '@dgrammatiko/joomla-tools',
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-plugin-import',
  'eslint-plugin-vue',
  'stylelint',
  'stylelint-config-standard',
  'stylelint-order',
  'stylelint-scss',
];

const baseJson = {
  name: 'rename-me',
  version: '0.0.1',
  scripts: {
    test: 'exit 1'
  }
}

const baseScripts = {
  scripts: {
    init: 'joomla-tools -i'
  }
}

/**
 * create or update package.json
 *
 * @param {string} type The extension type
 * @param {{}} ans The ans object
 */
async function createOrUpdatePackage(type, ans) {
  let jsonObj = {
    ...baseJson,
    ...baseScripts,
    devDependencies: {}
  };

  if (existsSync('./package.json')) {
    try {
      const raw = await readFile('./package.json', { encoding: 'utf8'});
      const jsonTmp = JSON.parse(raw);
      if (typeof jsonTmp === 'object') jsonObj = jsonTmp;
    } catch (err) { /** nothing */}
  }

  await updateExistingJSON(jsonObj);
}

async function updateExistingJSON(currentJSON) {
  const devDeps = await Promise.all(devDependencies.map(dep => getVersion(dep)))

  if (!currentJSON.devDependencies.length) {
    currentJSON.devDependencies = {}
  }

  devDeps.forEach(element => {
    currentJSON.devDependencies[Object.keys(element)[0]] = Object.values(element)[0];
  });

  writeFile('package.json', JSON.stringify(currentJSON, undefined, 2), { encoding: 'utf8'});
}

export {createOrUpdatePackage};
