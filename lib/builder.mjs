import inquirer from 'inquirer';
import { createExtension } from './utils/createExtension.mjs';
import { onError } from './utils/onError.mjs';
import { components } from './questions/components.mjs';
import { libraries } from './questions/libraries.mjs';
import { modules } from './questions/modules.mjs';
import { plugins } from './questions/plugins.mjs';
import { templates } from './questions/templates.mjs';

const execs = {
  components: components,
  libraries: libraries,
  modules: modules,
  plugins: plugins,
  templates: templates,
};

const builder = async ({ type }) => inquirer.prompt(execs[type]).then(async ans => createExtension(type, ans)).catch(onError);

export {builder};
