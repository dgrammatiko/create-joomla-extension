import {reserved} from '@dgrammatiko/joomla-extension-templates/dist/templates.js';

const components = [
  {
    type: 'input',
    message: 'What\'s the name of the component [lowercase]?',
    name: 'name',
    validate: (value) => {
      if (!reserved.components.includes(value.toLowerCase())) {
        if (value.match(/^\d/)) return 'The component name needs to start with a letter';
        if (!value.match(/^[0-9a-z]+$/)) return 'The component name can have only alphanumeric lowercase entries';
        return true;
      } else {
        return 'The component name is conflicing with one of Joomla\'s core component, try another';
      }
    },
  },
];

export {components};
