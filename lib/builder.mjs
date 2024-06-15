import * as p from "@clack/prompts";
import { pascalCase } from "change-case";
import { reserved } from "../_templates.js";

function validateName(value, reservedNames, texts) {
  if (!reservedNames.includes(value.toLowerCase())) {
    if (value.match(/^\d/)) return `The ${texts.extensionType} name "${value}" needs to start with a letter`;
    if (!value.match(/^[0-9a-z_]+$/)) return `The ${texts.extensionType} name "${value}" can have only alphanumeric lowercase entries`;
  } else {
    return `The ${texts.extensionType} name "${value}" is reserved as it is used by Joomla, try another one...`;
  }
}

function buildQuestions(p, type) {
  const questions = {};

  if (type === 'modules' || type === 'templates') {
    questions.client = () => p.select({
      message: `Is this a front end or backend ${type=== 'modules' ? 'module' : 'template'}?`,
      options: [
        { value: "administrator", label: "Administrator" },
        { value: "site", label: "Site" },
      ],
    });
  }

  if (type === 'plugins') {
    questions.folder = () => p.select({
      message: "What should be the type of this plugin?",
      options: Object.keys(reserved.plugins).map((plg) => ({
        value: plg,
        label: pascalCase(plg),
      })),
    });
  }

  return questions;
}

function getSingularName(type) {
  return !type.endsWith('s')
  ? type
  : type.endsWith('ies')
    ? type.substr(0, type.length - 3) + 'y'
    : type.endsWith('s')
      ? type.substr(0, type.length - 1)
      : type;
}

const builder = async (type) => {
  let answers = await p.group(
    {
      ...buildQuestions(p, type),
      name: ({ results }) => p.text({
        message: `What should be the name of the ${getSingularName(type)} [lowercase]?`,
        validate: (value) => {
          const res = (type === "modules" || type === "templates")
            ? reserved[type][results.client]
            : (type === "plugins")
              ? reserved.plugins[results.folder]
              : reserved[type];

          return validateName(value, res, {extensionName: `${getSingularName(type)} name`, extensionType: `${getSingularName(type)}`});
        },
      }),
    },
    {
      onCancel: ({ results }) => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    },
  );

  answers = { ...{ name: null, folder: null, client: null }, ...answers };

  const { createExtension } = await import("./utils/createExtension.mjs");

  createExtension(type, answers);
}

export { builder };
