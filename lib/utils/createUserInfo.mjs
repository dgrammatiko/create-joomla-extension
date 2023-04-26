import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import inquirer from 'inquirer';
import { userInfo } from '../questions/userInfo.mjs';

async function createUserInfo() {
  let jsonObj;
  if (existsSync('user-info.json')) {
    try {
      const raw = await readFile('user-info.json', { encoding: 'utf8'});
      const jsonTmp = JSON.parse(raw);
      if (typeof jsonTmp === 'object') jsonObj = jsonTmp;
    } catch (err) { /** nothing */}
  } else {
    await inquirer
      .prompt(userInfo)
      .then(async (ans) => {
        jsonObj = {
          namespace: ans.namespace,
          userName: ans.userName,
          userEmail: ans.userEmail,
          userURL: ans.userURL,
          userLicense: ans.userLicense,
          userCopyright: ans.userCopyright,
        }
      });
  }

  if (!jsonObj) throw new Error('Something went wrong');

  globalThis.userInfo = jsonObj;
  console.log(globalThis.userInfo)
  await writeFile('user-info.json', JSON.stringify(jsonObj, undefined, 2), { encoding: 'utf8'});
}

export {createUserInfo};
