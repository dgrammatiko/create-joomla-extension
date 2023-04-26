import { validateName } from '../utils/utils.mjs';
// import reserved from '../reserved.json' assert {type: 'json'};
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const reserved = require('../reserved.json');

const questions = [
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
    validate: (value, answers) => validateName(value, reserved.template[answers.client], {componentName: 'template name', component: 'template'})
  }
];

export {questions};
