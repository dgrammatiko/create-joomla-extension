#!/usr/bin/env node
import { intro, outro, isCancel, cancel } from "@clack/prompts";
import { createUserInfo } from './lib/utils/createUserInfo.mjs';
import { initialQuestion } from "./lib/utils/initialQuestion.mjs";

intro(`
                      _
                     | |
   ___ _ __ ___  __ _| |_ ___
  / __| '__/ _ \\/ _\` | __/ _ \\
 | (__| | |  __/ (_| | ||  __/
  \\___|_|  \\___|\\__,_|\\__\\___| _
      | |                     | |
      | | ___   ___  _ __ ___ | | __ _
  _   | |/ _ \\ / _ \\| '_ \` _ \\| |/ _\` |
 | |__| | (_) | (_) | | | | | | | (_| |
  \\____/ \\___/ \\___/|_| |_| |_|_|\\__,_|
      \\ \\ / / |               (_)
   ___ \\ V /| |_ ___ _ __  ___ _  ___  _ __
  / _ \\ > < | __/ _ \\ '_ \\/ __| |/ _ \\| '_ \\
 |  __// . \\| ||  __/ | | \\__ \\ | (_) | | | |
  \\___/_/ \\_\\\\__\\___|_| |_|___/_|\\___/|_| |_|
`);

await createUserInfo();

const type = await initialQuestion();

if (isCancel(type)) {
  cancel("Operation cancelled.");
  process.exit(0);
}

const { builder} = await import('./lib/builder.mjs')

await builder(type);

outro(`You're all set!`);
