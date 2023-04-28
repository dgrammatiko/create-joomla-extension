#!/usr/bin/env node
import inquirer from 'inquirer';
import { initialQuestions } from './lib/questions/initial.mjs';
import { createUserInfo } from './lib/utils/createUserInfo.mjs';

(async function () {
  await createUserInfo();

  inquirer
    .prompt(initialQuestions)
    .then(async (ans) => {
      return {
        answer: ans,
        mod: await import('./lib/builder.mjs'),
      }
    })
    .then((opt) => opt.mod.builder(opt.answer));
})();
