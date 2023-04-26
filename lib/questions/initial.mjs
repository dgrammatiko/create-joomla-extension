const initialQuestions = [
  {
    type: 'rawlist',
    message: 'What do you want to build today?',
    name: 'type',
    choices: [
      { name: 'Component', value: 'component', disabled: false },
      { name: 'Module', value: 'module', disabled: false },
      { name: 'Plugin', value: 'plugin', disabled: false },
      { name: 'Template', value: 'template', disabled: false },
      { name: 'Library', value: 'library', disabled: false },
    ],
  },
];

export {initialQuestions};
