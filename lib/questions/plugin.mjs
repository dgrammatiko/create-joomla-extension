import { validateName } from '../utils/utils.mjs';
// import reserved from '../reserved.json' assert {type: 'json'};
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const reserved = require('../reserved.json');

const questions = [
  {
    type: 'rawlist',
    name: 'type',
    message: 'What should be the type of this plugin?',
    choices: [
      {name: "Actionlog", value: "actionlog"},
      {name: "Api-Authentication", value: "api-authentication"},
      {name: "Authentication", value: "authentication"},
      {name: "Behaviour", value: "behaviour"},
      {name: "Captcha", value: "captcha"},
      {name: "Content", value: "content"},
      {name: "Editors", value: "editors"},
      {name: "Editors-XTD", value: "editors-xtd"},
      {name: "Extension", value: "extension"},
      {name: "Fields", value: "fields"},
      {name: "Filesystem", value: "filesystem"},
      {name: "Finder", value: "finder"},
      {name: "Installer", value: "installer"},
      {name: "Media-Action", value: "action"},
      {name: "Multifactorauth", value: "multifactorauth"},
      {name: "Privacy", value: "privacy"},
      {name: "Quickicon", value: "quickicon"},
      {name: "Sampledata", value: "sampledata"},
      {name: "System", value: "system"},
      {name: "Task", value: "task"},
      {name: "User", value: "user"},
      {name: "Webservices", value: "webservices"},
      {name: "Workflow", value: "workflow"},
    ],
    filter: (val) => val.toLowerCase(),
  },
  {
    type: 'input',
    message: 'What\'s the name of the plugin?',
    name: 'name',
    validate: (value, answers) => validateName(value, reserved.plugin[answers.type], {componentName: 'plugin name', component: 'plugin'}),
  }
];

export {questions};
