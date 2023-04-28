import {reserved} from '@dgrammatiko/joomla-extension-templates/dist/templates.js';
import { validateName } from '../utils/utils.mjs';

const templates = [
  {
    type: 'rawlist',
    name: 'client',
    message: 'Is this a Site or Administrator template?',
    choices: [
      {name: 'Site', value: 'site'},
      {name: 'Administrator', value: 'administrator'},
    ],
    filter: (val) => val.toLowerCase(),
  },
  {
    type: 'input',
    message: 'What\'s the name of the template?',
    name: 'name',
    validate: (value, answers) => validateName(value, reserved.templates[answers.client], {extensionName: 'template name', extensionType: 'template'})
  }
];

export {templates};
