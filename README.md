# create-joomla-extension
Joomla 4 instant extension scaffolding

## Prerequisites
- [Node/npm](https://nodejs.org/en/)
- PHP server: anything from XAMP, MAMP, or a Docker solution will do as long as it got the latest PHP/Mysql and either Apache/Nginx (Always prefer Nginx)

### First and foremost set some defaults
- `npm config set init-author-email "d.grammatiko@gmail.com"`
- `npm config set init-author-name "Dimitris Grammatikogiannis"`
- `npm config set init-author-url "https://dgrammatiko.online"`
- `npm config set init-license "MIT"`
- `npm config set init-version "0.0.0"`

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
  |       |-- module bbb (tpl_bbb)

```
