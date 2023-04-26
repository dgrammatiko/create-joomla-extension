import { validateName } from '../utils/utils.mjs';
// import reserved from '../reserved.json' assert {type: 'json'};
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const reserved = require('../reserved.json');

const questions = [
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
    validate: (value, answers) => validateName(value, reserved.module[answers.client], {componentName: 'module name', component: 'modules'}),
  }
];

export {questions};
