import { pascalCase } from 'change-case';
import { pluginTypes, reserved } from '@dgrammatiko/joomla-extension-templates/dist/templates.js';
import { validateName } from '../utils/utils.mjs';

const choices = [];
for (const plg of pluginTypes) {
  choices.push({ name: pascalCase(plg), value: plg });
}

const plugins = [
  {
    type: 'rawlist',
    name: 'folder',
    message: 'What should be the type of this plugin?',
    choices: choices,
    filter: (val) => val.toLowerCase(),
  },
  {
    type: 'input',
    message: 'What\'s the name of the plugin?',
    name: 'name',
    validate: (value, answers) => validateName(value, reserved.plugins[answers.folder], {extensionName: 'plugin name', extensionType: 'plugin'}),
  }
];

export {plugins};
