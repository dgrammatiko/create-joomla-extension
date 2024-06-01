import { join } from 'node:path';
import { cwd } from 'node:process';
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { pluginTypes } from '../../_templates.js';
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
      const raw = readFileSync(join(cwd(), 'package.json'), { encoding: 'utf8'});
      const jsonTmp = JSON.parse(raw);
      if (typeof jsonTmp === 'object') jsonObj = jsonTmp;
    } catch (err) { /** nothing */}
  }

  await updateExistingJSON(jsonObj, type, ans);
}

async function updateExistingJSON(currentJSON, type, ans) {
  const devDeps = await Promise.all(devDependencies.map(dep => getVersion(dep)))
  const defaultExt = { name: ans.name, version: "0.0.1" };

  // Get the latest Joomla version from Github releases
  currentJSON.joomlaVersion = currentJSON.joomlaVersion ? currentJSON.joomlaVersion : "4.4.0";

  if (!currentJSON.devDependencies.length) {
    currentJSON.devDependencies = {}
  }

  for (const dep of devDeps) {
    currentJSON.devDependencies[Object.keys(dep)[0]] = Object.values(dep)[0];
  }

  if (!currentJSON['joomla-extensions']) {
    currentJSON['joomla-extensions'] = defaultOptions;
  } else {
    currentJSON['joomla-extensions'] = {...defaultOptions, ...currentJSON['joomla-extensions'] };
  }

  if (!currentJSON['joomla-extensions'].plugins) {
    currentJSON['joomla-extensions'].plugins = {};
  }

  // Normalise options
  for (const plg of pluginTypes) {
    if (!currentJSON['joomla-extensions'].plugins[plg]) {
      currentJSON["joomla-extensions"].plugins[plg] = [];
    }
  }


  switch(type) {
    case 'components':
      currentJSON['joomla-extensions'].components.push(defaultExt);
      break;
    case 'libraries':
      currentJSON['joomla-extensions'].libraries.push(defaultExt);
      break;
    case 'modules':
      currentJSON['joomla-extensions'].modules[ans.client === 'administrator' ? 'administrator' : 'site'].push(defaultExt);
      break;
    case 'templates':
      currentJSON['joomla-extensions'].templates[ans.client === 'administrator' ? 'administrator' : 'site'].push(defaultExt);
      break;
    case 'plugins':
      currentJSON['joomla-extensions'].plugins[ans.folder].push(defaultExt);
      break;
    case 'packages':
      break;
  }

  writeFileSync('package.json', JSON.stringify(currentJSON, undefined, 2), { encoding: 'utf8'});
}

export {createOrUpdatePackage};
