import Arborist from "@npmcli/arborist";
import fs from "node:fs/promises";
import path from "node:path";

console.log("+++ generateLockfile");

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const isolateDir = path.join(__dirname, "../isolate");
console.log("+++ isolateDir", isolateDir);

const internalPackageNames = ["@mono/common", "@mono/backend"];

console.log("+++ internal packages", internalPackageNames);

/** Should be a list of local package names I think */

// Create a tree of the dependencies for this workspace.
// const arborist = new Arborist({ path: workspaceRootDir });
const arborist = new Arborist();
const { meta } = await arborist.buildIdealTree({ rm: internalPackageNames });
meta?.commit();

const lockfilePath = path.join(isolateDir, "package-lock.json");
// Write `package-lock.json` file in the `dist/` directory.
// await fs.mkdir(path.join(isolateDir, "dist"), { recursive: true });
await fs.writeFile(lockfilePath, String(meta));

console.log("+++ generated lockfile at", lockfilePath);