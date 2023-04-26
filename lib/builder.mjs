import inquirer from 'inquirer';
import { createExtension } from './utils/createExtension.mjs';
import { onError } from './utils/onError.mjs';
import { questions as component } from './questions/component.mjs';
import { questions as library } from './questions/library.mjs';
import { questions as mod } from './questions/module.mjs';
import { questions as plugin } from './questions/plugin.mjs';
import { questions as template } from './questions/template.mjs';

const builder = async ({type: type}) => {
  let qs;
  switch(type) {
    case 'component':
      qs = component;
      break;
    case 'library':
      qs = library;
      break;
    case 'module':
      qs = mod;
      break;
    case 'plugin':
      qs = plugin;
      break;
    case 'template':
      qs = template;
      break;
  }

  inquirer.prompt(qs).then(async ans => createExtension(type, ans)).catch(onError);
};

export {builder};
