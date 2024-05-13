const userInfo = [
  {
    type: 'input',
    message: 'What\'s the company name for the namespace?',
    name: 'namespace',
    default: 'dgrammatiko',
    validate: (value) => {
      if (!['joomla'].includes(value.toLowerCase())) {
        if (value.match(/^\d/)) return 'The namespace string needs to start with a letter';
        if (!value.match(/^[0-9a-z_]+$/)) return 'The namespace string can have only alphanumeric lowercase entries';
        return true;
      } else {
        return 'The namespace string is conflicing with one of Joomla\'s core namespace, try another';
      }
    },
  },
  {
    type: 'input',
    message: 'What\'s the author name/surname?',
    name: 'userName',
    default: 'Dimitrios Grammatikogiannis',
  },
  {
    type: 'input',
    message: 'What\'s the author email?',
    name: 'userEmail',
    default: 'd.grammatiko@gmail.com',
  },
  {
    type: 'input',
    message: 'What\'s the author URL?',
    name: 'userURL',
    default: 'https://dgrammatiko.dev',
  },
  {
    type: 'input',
    message: 'What\'s the licence text?',
    name: 'userLicense',
    default: 'GNU General Public License version 3 or later',
  },
  {
    type: 'input',
    message: 'What\'s the copyright text?',
    name: 'userCopyright',
    default: '(C) {{currentYear}} Dimitrios Grammatikogiannis'
  },
];

export {userInfo};
