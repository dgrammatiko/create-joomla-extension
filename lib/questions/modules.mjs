import {reserved} from '@dgrammatiko/joomla-extension-templates/dist/templates.js';
import { validateName } from '../utils/utils.mjs';

const modules = [
  {
    type: 'rawlist',
    name: 'client',
    message: 'Is this a front end or backend module?',
    choices: [
      {name: 'Administrator', value: 'administrator'},
      {name: 'Site', value: 'site'},
    ],
    filter: (val) => val.toLowerCase(),
  },
  {
    type: 'input',
    message: 'What\'s the name of the module?',
    name: 'name',
    validate: (value, answers) => validateName(value, reserved.modules[answers.client], {extensionName: 'module name', extensionType: 'modules'}),
  }
];

export {modules};
