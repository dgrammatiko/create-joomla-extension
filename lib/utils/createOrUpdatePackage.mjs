import { readFile, writeFile } from 'node:fs/promises';
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

const devDependencies = [
  '@dgrammatiko/joomla-tools',
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
    "get-joomla": "node joomla-tools.mjs -i",
    "link": "joomla-tools -l",
    "build": "joomla-tools -b media_source",
    "release": "joomla-tools -r",
    "init": "joomla-tools -i && joomla-tools -b media_source && joomla-tools -l",
    "lint-css": "npx stylelint media_src/css/.",
    "lint-js": "npx eslint media_src/js/.",
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

  if (existsSync('./package.json')) {
    try {
      const raw = await readFile('./package.json', { encoding: 'utf8'});
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
      currentJSON['joomla-extensions'].components.push(ans.name);
      break;
    case 'libraries':
      currentJSON['joomla-extensions'].libraries.push(ans.name);
      break;
    case 'modules':
      currentJSON['joomla-extensions'].modules[ans.client === 'administrator' ? 'administrator' : 'site'].push(ans.name);
      break;
    case 'templates':
      currentJSON['joomla-extensions'].templates[ans.client === 'administrator' ? 'administrator' : 'site'].push(ans.name);
      break;
    case 'plugins':
      currentJSON['joomla-extensions']['plugins'][ans.folder][ans.name] = [];
      break;
  }

  writeFile('package.json', JSON.stringify(currentJSON, undefined, 2), { encoding: 'utf8'});
}

export {createOrUpdatePackage};
