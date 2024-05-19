import { existsSync, readFileSync, writeFileSync } from "node:fs";
import * as p from "@clack/prompts";

let jsonObj;
const userInfo = {
  namespace: {
    message: "What's the company name for the namespace?",
    initialValue: "Dgrammatiko",
    placeholder: "Dgrammatiko",
    validate: (value) => {
      if (["joomla"].includes(value.toLowerCase())) return "The namespace string is conflicing with one of Joomla's core namespace, try another";
      if (!value.match(/^[A-Z].[A-Za-z0-9_]+$/)) return "The namespace string can have only alphanumeric entries, first letter uppercase";
    },
  },
  userName: {
    message: "What's the author name/surname?",
    initialValue: "Dimitrios Grammatikogiannis",
    placeholder: "Dimitrios Grammatikogiannis",
  },
  userEmail: {
    message: "What's the author email?",
    initialValue: "d.grammatiko@gmail.com",
    placeholder: "d.grammatiko@gmail.com",
  },
  userURL: {
    message: "What's the author URL?",
    initialValue: "https://dgrammatiko.dev",
    placeholder: "https://dgrammatiko.dev",
  },
  userLicense: {
    message: "What's the licence text?",
    initialValue: "GNU General Public License version 3 or later",
    placeholder: "GNU General Public License version 3 or later",
  },
  userCopyright: {
    message: "What's the copyright text?",
    initialValue: "(C) {{currentYear}} Dimitrios Grammatikogiannis",
    placeholder: "(C) {{currentYear}} Dimitrios Grammatikogiannis",
  },
};

async function createUserInfo() {
  if (existsSync('user-info.json')) {
    try {
      const raw = readFileSync('user-info.json', { encoding: 'utf8'});
      const jsonTmp = JSON.parse(raw);
      if (typeof jsonTmp === 'object') jsonObj = jsonTmp;
    } catch (err) { /** nothing */}
  } else {
    const group = await p.group(
      {
        namespace: () => p.text(userInfo.namespace),
        userName: () => p.text(userInfo.userName),
        userEmail: () => p.text(userInfo.userEmail),
        userURL: () => p.text(userInfo.userURL),
        userLicense: () => p.text(userInfo.userLicense),
        userCopyright: () => p.text(userInfo.userCopyright),
      },
      {
        onCancel: ({ results }) => {
          p.cancel("Operation cancelled.");
          process.exit(0);
        },
      },
    );

    jsonObj = { ...group };
  }

  if (!jsonObj) throw new Error('Something went wrong');

  globalThis.userInfo = jsonObj;
  console.table(globalThis.userInfo);

  writeFileSync('user-info.json', JSON.stringify(jsonObj, undefined, 2), { encoding: 'utf8'});
}

export {createUserInfo};
