import { pascalCase } from 'change-case';
import { month, year } from './utils.mjs';

const userName = globalThis.userInfo.userName.toString().trim();
const userEmail = globalThis.userInfo.userEmail.toString().trim();
const userUrl = globalThis.userInfo.userURL.toString().trim();
const userCopyright = globalThis.userInfo.userCopyright.toString().trim();
const companyName = globalThis.userInfo.userLicense.toString().trim();

function replaceTags(originalSource, originalName, originalClient = '') {
  const name = originalName.toLowerCase();
  const namespace = companyName.toLowerCase();

  const searchAndReplace = [
    {search: /{{copyright}}/g, replace: userCopyright},
    {search: /{{year}}/g, replace: year},
    {search: /{{date}}/g, replace: `${month} ${year}`},
    {search: /{{authorName}}/g, replace: userName},
    {search: /{{authorEmail}}/g, replace: userEmail},
    {search: /{{authorWebsite}}/g, replace: userUrl},
    {search: /{{companyNamePascal}}/g, replace: pascalCase(globalThis.namespace)},

    // Component
    {search: /{{componentNamespacePascal}}/g, replace: pascalCase(globalThis.namespace)},
    {search: /{{componentNamePascal}}/g, replace: pascalCase(name)},
    {search: /{{componentName}}/g, replace: name},
    {search: /{{componentNameLowercase}}/g, replace: name.toLowerCase()},

    // Module
    {search: /{{moduleNamespacePascal}}/g, replace: pascalCase(globalThis.namespace)},
    {search: /{{moduleNamespace}}/g, replace: namespace.toLowerCase()},
    {search: /{{moduleNamePascal}}/g, replace: pascalCase(name)},
    {search: /{{moduleNameLowercase}}/g, replace: name.toLowerCase()},
    {search: /{{clientNameLowercase}}/g, replace: originalClient.toLowerCase()},
    {search: /{{clientNamePascal}}/g, replace: pascalCase(originalClient.toLowerCase())},

    // Plugin
    {search: /{{pluginNamespacePascal}}/g, replace: pascalCase(globalThis.namespace)},
    {search: /{{pluginNamespace}}/g, replace: namespace.toLowerCase()},
    {search: /{{pluginNamePascal}}/g, replace: pascalCase(name)},
    {search: /{{pluginNameLowercase}}/g, replace: name.toLowerCase()},
    {search: /{{typePascal}}/g, replace: pascalCase(originalClient.toLowerCase())},
    {search: /{{typeLowercase}}/g, replace: originalClient.toLowerCase()},

    // Library
    {search: /{{libraryNamespacePascal}}/g, replace: pascalCase(globalThis.namespace)},
    {search: /{{libraryNamespace}}/g, replace: namespace.toLowerCase()},
    {search: /{{libraryNamePascal}}/g, replace: pascalCase(name)},
    {search: /{{libraryNameLowercase}}/g, replace: name.toLowerCase()},

    // Template
    {search: /{{templateNamespacePascal}}/g, replace: pascalCase(globalThis.namespace)},
    {search: /{{templateNamespace}}/g, replace: namespace.toLowerCase()},
    {search: /{{templateNamePascal}}/g, replace: pascalCase(name)},
    {search: /{{templateNameLowercase}}/g, replace: name.toLowerCase()},
    {search: /{{clientNameLowercase}}/g, replace: originalClient.toLowerCase()},
    {search: /{{clientNamePascal}}/g, replace: pascalCase(originalClient.toLowerCase())},
  ];

  let source = originalSource || '';
  searchAndReplace.forEach((el) => {
    source = source.replace(el.search, el.replace);
  });

  return source;
}

export {replaceTags};
