const initialQuestions = [
  {
    type: 'rawlist',
    message: 'What do you want to build today?',
    name: 'type',
    choices: [
      { name: 'Component', value: 'components' }, //, disabled: false
      { name: 'Module', value: 'modules' },
      { name: 'Plugin', value: 'plugins' },
      { name: 'Template', value: 'templates' },
      { name: 'Library', value: 'libraries' },
    ],
  },
];

export {initialQuestions};
