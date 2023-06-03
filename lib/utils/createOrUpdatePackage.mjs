import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { existsSync } from 'node:fs';
import { pluginTypes } from '@dgrammatiko/joomla-extension-templates/dist/templates.js';
import { getVersion } from './getPkgVersion.mjs'

const defaultOptions = {
  components: [],
  libraries: [],
  modules: {
    administrator: [],
    site: [],
  },
  plugins: {},
  templates: {
    administrator: [],
    site: [],
  }
};

const devDependencies = ['@dgrammatiko/joomla-tools'];

const baseJson = {
  name: 'rename-me',
  version: '0.0.1',
  scripts: {
    "get-joomla": "node joomla-tools.mjs -i",
    "link": "joomla-tools -l",
    "build": "joomla-tools -b media_source",
    "release": "joomla-tools -r",
    "init": "joomla-tools -i && joomla-tools -b media_source && joomla-tools -l",
    "lint-css": "./node_modules/stylelint/bin/stylelint.js ./media_source/.",
    "lint-js": "./node_modules/eslint/bin/eslint.js ./media_source/**/*.mjs",
    "lint": "npm run lint-css && npm run lint-js",
    "update:browserlist": "npx browserslist@latest --update-db"
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
    devDependencies: {}
  };

  // Normalise options
  for (const plg of pluginTypes) {
    defaultOptions.plugins[plg] = [];
  }

  if (existsSync(join(cwd(), 'package.json'))) {
    try {
      const raw = await readFile(join(cwd(), 'package.json'), { encoding: 'utf8'});
      const jsonTmp = JSON.parse(raw);
      if (typeof jsonTmp === 'object') jsonObj = jsonTmp;
    } catch (err) { /** nothing */}
  }

  await updateExistingJSON(jsonObj, type, ans);
}

async function updateExistingJSON(currentJSON, type, ans) {
  const devDeps = await Promise.all(devDependencies.map(dep => getVersion(dep)))

  if (!currentJSON.devDependencies.length) {
    currentJSON.devDependencies = {}
  }
  if (!currentJSON['joomla-extensions']) {
    currentJSON['joomla-extensions'] = defaultOptions;
  } else {
    currentJSON['joomla-extensions'] = {...defaultOptions, ...currentJSON['joomla-extensions'] };
  }
  if (!currentJSON['joomla-extensions']['plugins']) {
    currentJSON['joomla-extensions'].plugins = {};
  }
  // Normalise options
  for (const plg of pluginTypes) {
    currentJSON['joomla-extensions'].plugins[plg] = [];
  }

  devDeps.forEach(element => {
    currentJSON.devDependencies[Object.keys(element)[0]] = Object.values(element)[0];
  });

  // Get the latest Joomla version from Github releases
  currentJSON.joomlaVersion = '4.3.0';

  switch(type) {
    case 'components':
      currentJSON['joomla-extensions'].components.push({ name: ans.name, version: `0.0.0`});
      break;
    case 'libraries':
      currentJSON['joomla-extensions'].libraries.push({ name: ans.name, version: `0.0.0`});
      break;
    case 'modules':
      currentJSON['joomla-extensions'].modules[ans.client === 'administrator' ? 'administrator' : 'site'].push({ name: ans.name, version: `0.0.0`});
      break;
    case 'templates':
      currentJSON['joomla-extensions'].templates[ans.client === 'administrator' ? 'administrator' : 'site'].push({ name: ans.name, version: `0.0.0`});
      break;
    case 'plugins':
      currentJSON['joomla-extensions']['plugins'][ans.folder].push({ name: ans.name, version: `0.0.0`});
      break;
  }

  writeFile('package.json', JSON.stringify(currentJSON, undefined, 2), { encoding: 'utf8'});
}

export {createOrUpdatePackage};
