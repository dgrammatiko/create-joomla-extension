import { execSync } from 'node:child_process';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
][currentDate.getMonth()];

function validateName(value, reservedNames, texts) {
  if (!reservedNames.includes(value.toLowerCase())) {
    if (value.match(/^\d/)) {
      return `The ${texts.componentName} needs to start with a letter`;
    }
    if (!value.match(/^[0-9a-z]+$/)) {
      return `The ${texts.componentName} can have only alphanumeric entries`;
    }
    return true;
  } else {
    return `The ${texts.componentName} was conflicing with one of Joomla\'s core ${texts.componentType}, try another`;
  }
};

export {year, month, validateName};
