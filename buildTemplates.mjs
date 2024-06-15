import { execSync } from "node:child_process";
import fs, { existsSync } from "node:fs";
import { sep, extname } from "node:path";
import dirTree from "directory-tree";

const tmplRepo = "https://github.com/dgrammatiko/joomla-extension-templates.git";
execSync(`git clone --depth 1 ${tmplRepo} tmpl`);

const folder = "tmpl/src";
const folderMedia = "tmpl/media_source";
const utfFiles = [".html",".scss",".mjs",".json",".js",".css",".svg",".php",".xml",".ini",".gitignore",".eslintrc",];
let treeMedia = { children: [] };
const data = {};
const addContent = (item) => item.type === "file" ? fs.readFileSync(item.path, { encoding: utfFiles.includes(extname(item.path)) ? "utf8" : "base64" }) : "";
const fixPath = (item, php) =>
  php
    ? item.path
        .replace(`tmpl${sep}src${sep}root${sep}`, "")
        .replace(`tmpl${sep}src${sep}`, `src${sep}`)
    : item.path
        .replace(`components${sep}`, "")
        .replace(`libraries${sep}`, "")
        .replace(`modules${sep}`, "")
        .replace(`plugins${sep}`, "")
        .replace(`tmpl${sep}media_source${sep}`, `media_source${sep}`);

function recurs(item, php) {
  item.children.forEach((child) => {
    if (child.children) {
      recurs(child, php);
      child.path = fixPath(child, php);
      child.name = undefined;
    } else {
      child.contents = addContent(child, php);
      child.path = fixPath(child, php);
      child.name = undefined;
    }
  });
}

fs.readdirSync(folder).forEach((dir) => {
  if ([".", "..", ".DS_Store"].includes(dir)) {
    return;
  }
  const tree = dirTree(`${folder}/${dir}`, { attributes: ["type"] });

  if (tree.children && tree.children.length) {
    tree.children.forEach((child) => {
      if (child.children) {
        recurs(child, true, dir);
        child.path = fixPath(child, true, dir);
        child.name = undefined;
      } else {
        child.contents = addContent(child, true, dir);
        child.path = fixPath(child, true, dir);
        child.name = undefined;
      }
    });
  }

  if (!existsSync(`${folderMedia}/${dir}`)) {
    treeMedia = { children: [] };
  } else {
    treeMedia = dirTree(`${folderMedia}/${dir}`, { attributes: ["type"] });

    treeMedia.children.forEach((child) => {
      if (child.children) {
        recurs(child, false, dir);
        child.path = fixPath(child, false, dir);
        child.name = undefined;
      } else {
        child.contents = addContent(child, false, dir);
        child.path = fixPath(child, false, dir);
        child.name = undefined;
      }
    });
  }

  data[dir] = { php: tree.children, media: treeMedia.children };
});

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

const reserved = JSON.parse(fs.readFileSync("tmpl/reserved.json"));

const outputText = `/** AutoGenerated from: https://github.com/dgrammatiko/joomla-extension-templates **/
const template = ${ JSON.stringify(data, null, 2) };
const reserved = ${ JSON.stringify(reserved, null, 2) };

export { template, reserved };
`;

fs.writeFileSync("./_templates.js", outputText, { encoding: "utf-8" });

fs.rmSync("tmpl", { recursive: true, force: true });
