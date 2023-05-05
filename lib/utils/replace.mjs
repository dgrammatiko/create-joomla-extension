import { pascalCase } from 'change-case';
import { month, year } from './utils.mjs';

const userName = globalThis.userInfo.userName.toString().trim();
const userEmail = globalThis.userInfo.userEmail.toString().trim();
const userURL = globalThis.userInfo.userURL.toString().trim();
const userCopyright = globalThis.userInfo.userCopyright.toString().trim();
const userLicense = globalThis.userInfo.userLicense.toString().trim();
const namespace = globalThis.userInfo.namespace.toString().trim().toLowerCase();

function replaceTags(originalSource, ans) {
  if (!originalSource) return;
  const name = ans.name.toLowerCase();
  const pairs = [
    {search: '{{copyright}}', change: userCopyright.replaceAll('{{currentYear}}', year)},
    {search: '{{license}}', change: userLicense},
    {search: '{{year}}', change: year},
    {search: '{{date}}', change: `${year}-${month}`},
    {search: '{{authorName}}', change: userName},
    {search: '{{authorEmail}}', change: userEmail},
    {search: '{{authorWebsite}}', change: userURL},
    {search: '{{companyNamePascal}}', change: pascalCase(namespace)},

    // Namespace, company part
    {search: '{{extensionNamespacePascal}}', change: pascalCase(namespace)},
    {search: '{{extensionNamespace}}', change: namespace.toLowerCase()},

    // Extension name
    {search: '{{extensionName}}', change: name},
    {search: '{{extensionNamePascal}}', change: pascalCase(name)},
    {search: '{{extensionNameLowercase}}', change: name},
    {search: '{{extensionNameUppercase}}', change: name.toUpperCase()},

    // Folder, ie plugins
    {search: '{{folderNamePascal}}', change: ans.folder ? pascalCase(ans.folder.toLowerCase()) : ''},
    {search: '{{folderNameLowercase}}', change: ans.folder ? ans.folder.toLowerCase() : ''},
    {search: '{{folderNameUppercase}}', change: ans.folder ? ans.folder.toUpperCase() : ''},

    // Client, ie templates/modules
    {search: '{{clientNamePascal}}', change: ans.client ? pascalCase(ans.client.toLowerCase()) : ''},
    {search: '{{clientNameLowercase}}', change: ans.client ? ans.client.toLowerCase() : ''},
    {search: '{{clientNameUppercase}}', change: ans.client ? ans.client.toUpperCase() : ''},
  ];

  let source = originalSource;
  for (const pair of pairs) {
    source = source.replaceAll(pair.search, pair.change);
  }

  return source;
}

export {replaceTags};
