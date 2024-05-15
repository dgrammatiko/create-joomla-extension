import {reserved} from '../_templates.js';

const libraries = [
  {
    type: 'input',
    message: 'What\'s the name of the library [lowercase]?',
    name: 'name',
    validate: (value) => {
      if (!reserved.libraries.includes(value.toLowerCase())) {
        if (value.match(/^\d/)) return 'The library name needs to start with a letter';
        if (!value.match(/^[0-9a-z]+$/)) return 'The library name can have only alphanumeric entries';
        return true;
      } else {
        return 'The library name is conflicing with one of Joomla\'s core libraries, try another';
      }
    },
  },
];

export {libraries};
