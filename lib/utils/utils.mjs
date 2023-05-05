const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (`0${currentDate.getMonth() + 1}`).slice(-2);
// const monthWord = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ][currentDate.getMonth()];

function validateName(value, reservedNames, texts) {
  if (!reservedNames.includes(value.toLowerCase())) {
    if (value.match(/^\d/)) {
      return `The ${texts.extensionType} name "${value}" needs to start with a letter`;
    }
    if (!value.match(/^[0-9a-z_]+$/)) {
      return `The ${texts.extensionType} name "${value}" can have only alphanumeric lowercase entries`;
    }
    return true;
  } else {
    return `The ${texts.extensionType} name "${value}" was conflicing with one of Joomla\'s core ${texts.extensionType}, try another one...`;
  }
};

export {year, month, validateName};
