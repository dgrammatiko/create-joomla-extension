import { exec } from 'node:child_process';
import util from 'node:util';
const execPromise = util.promisify(exec);

async function getVersion(packageName) {
 const { stdout: nodeVersion } = await execPromise(`npm view ${packageName} version`, {encode: 'utf8'});

 return { [packageName]: nodeVersion.replace('\n', '') };
}

export {getVersion};
