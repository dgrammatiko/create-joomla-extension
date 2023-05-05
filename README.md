# create-joomla-extension
Joomla 4 instant extension scaffolding

## Prerequisites
- [Node/npm](https://nodejs.org/en/)
- PHP server: anything from XAMP, MAMP, or a Docker solution will do as long as it got the latest PHP/Mysql and either Apache/Nginx (Always prefer Nginx)

### Basic commands
- navigate to the folder that will be the base for your extension(s) through CLI
- run `npm create @dgrammatiko/create-joomla-extension`
- Answer the basic questions for the repeated replacable string (alternative a file named `user-info.json` could be copy/pasted in the same path)
- The `user-info.json` has the following content (if accepting the defaults):

```json
{
  "namespace": "Dgrammatiko",
  "userName": "Dimitrios Grammatikogiannis",
  "userEmail": "d.grammatiko@gmail.com",
  "userURL": "https://dgrammatiko.dev",
  "userLicense": "GNU General Public License version 3 or later",
  "userCopyright": "(C) {{currentYear}} Dimitrios Grammatikogiannis"
}
```
- Following steps are: 
- - Choose the extension type: Component, Module, Library, Plugin or Template
- - Modules and Templates need to be defined as Site or Administrator
- - Plugins need to be defined as their type, ie System, Content, etc

That's that. The extension basic files will be automatically created.

You can repeat the process to get more extensions...

Once you're ready you need to run `npm install` to get the needed tools.
Then `npm run init`

For the assets compilation/transpiling you could run `npm run build && npm run link` (`npm run link` is needed whenever more folders are introduced)

Finally run `npm run release` to get a distributable zip file.


### The concept
This is CLI tool that will generate a basic boilerplate of a component, module, plugin, library, template.
The command is expected to be run inside a directory that will become the source of your code.
It will generate a folder structure like:
```
  --parent folder
  |
  |-- components
  |   |
  |   |-- component xxx (com_xxx)
  |
  |-- libraries
  |   |
  |   |-- library yyy
  |
  |-- modules
  |   |
  |   |-- admin
  |   |   |
  |   |   |-- module zzz (mod_zzz)
  |   |
  |   |-- site
  |       |
  |       |-- module www (mod_www)
  |
  |-- plugins
  |
  |-- templates
  |   |
  |   |-- admin
  |   |   |
  |   |   |-- template aaa (tpl_aaa)
  |   |
  |   |-- site
  |       |
  |       |-- template bbb (tpl_bbb)

```
