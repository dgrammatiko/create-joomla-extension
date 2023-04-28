// import {template, pluginTypes, reserved} from '@dgrammatiko/joomla-extension-templates/dist/templates.js';

const userInfo = [
  {
    type: 'input',
    message: 'What\'s the company name for the namespace?',
    name: 'namespace',
    default: 'Dgrammatiko',
    // validate: (value) => {
    //   if (!['Joomla'].includes(value.toLowerCase())) {
    //     if (value.match(/^\d/)) return 'The namespace string needs to start with a letter';
    //     if (!value.match(/^[0-9a-z]+$/)) return 'The namespace string can have only alphanumeric entries';
    //     return true;
    //   } else {
    //     return 'The namespace string is conflicing with one of Joomla\'s core namespace, try another';
    //   }
    // },
  },
  {
    type: 'input',
    message: 'What\'s the author name/surname?',
    name: 'userName',
    default: 'Dimitrios Grammatikogiannis',
    // validate: (value) => {
    //   if (!['Joomla'].includes(value.toLowerCase())) {
    //     if (value.match(/^\d/)) return 'The namespace string needs to start with a letter';
    //     if (!value.match(/^[0-9a-z]+$/)) return 'The namespace string can have only alphanumeric entries';
    //     return true;
    //   } else {
    //     return 'The namespace string is conflicing with one of Joomla\'s core namespace, try another';
    //   }
    // },
  },
  {
    type: 'input',
    message: 'What\'s the author email?',
    name: 'userEmail',
    default: 'd.grammatiko@gmail.com',
    // validate: (value) => {
    //   if (!['Joomla'].includes(value.toLowerCase())) {
    //     if (value.match(/^\d/)) return 'The namespace string needs to start with a letter';
    //     if (!value.match(/^[0-9a-z]+$/)) return 'The namespace string can have only alphanumeric entries';
    //     return true;
    //   } else {
    //     return 'The namespace string is conflicing with one of Joomla\'s core namespace, try another';
    //   }
    // },
  },
  {
    type: 'input',
    message: 'What\'s the author URL?',
    name: 'userURL',
    default: 'https://dgrammatiko.dev',
    // validate: (value) => {
    //   if (!['Joomla'].includes(value.toLowerCase())) {
    //     if (value.match(/^\d/)) return 'The namespace string needs to start with a letter';
    //     if (!value.match(/^[0-9a-z]+$/)) return 'The namespace string can have only alphanumeric entries';
    //     return true;
    //   } else {
    //     return 'The namespace string is conflicing with one of Joomla\'s core namespace, try another';
    //   }
    // },
  },
  {
    type: 'input',
    message: 'What\'s the licence text?',
    name: 'userLicense',
    default: 'GNU General Public License version 3 or later',
    // validate: (value) => {
    //   if (!['Joomla'].includes(value.toLowerCase())) {
    //     if (value.match(/^\d/)) return 'The namespace string needs to start with a letter';
    //     if (!value.match(/^[0-9a-z]+$/)) return 'The namespace string can have only alphanumeric entries';
    //     return true;
    //   } else {
    //     return 'The namespace string is conflicing with one of Joomla\'s core namespace, try another';
    //   }
    // },
  },
  {
    type: 'input',
    message: 'What\'s the copyright text?',
    name: 'userCopyright',
    default: '(C) {{currentYear}} Dimitrios Grammatikogiannis'
    // validate: (value) => {
    //   if (!['Joomla'].includes(value.toLowerCase())) {
    //     if (value.match(/^\d/)) return 'The namespace string needs to start with a letter';
    //     if (!value.match(/^[0-9a-z]+$/)) return 'The namespace string can have only alphanumeric entries';
    //     return true;
    //   } else {
    //     return 'The namespace string is conflicing with one of Joomla\'s core namespace, try another';
    //   }
    // },
  },
];

export {userInfo};
