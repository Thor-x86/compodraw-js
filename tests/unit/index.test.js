const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "../../src/");

// Get subpackage names based on each directory name inside "src" folder
const subpackages = fs.readdirSync(sourcePath, { encoding: "utf-8" });
for (let i = 0; i < subpackages.length; i++) {
  const eachSubpackage = subpackages[i];
  const absPath = sourcePath + eachSubpackage;
  const isDirectory = fs.statSync(absPath).isDirectory();
  if (!isDirectory) {
    subpackages.splice(i, 1);
    i--;
  }
}

test("Each subpackage have index.ts", () => {
  for (const eachSubpackage of subpackages) {
    const absPath = sourcePath + eachSubpackage;
    const isIndexExist = fs.existsSync(absPath + "/index.ts");
    if (!isIndexExist)
      throw new Error(
        `TEST FAILED: Subpackage "${eachSubpackage}" has no index.ts`
      );
  }
});

test("Every index.ts of subpackages must be registered on root index.ts", () => {
  const rootIndexPath = sourcePath + "/index.ts";
  const rootIndex = fs
    .readFileSync(rootIndexPath, { encoding: "utf-8" })
    .replace(/\r/gm, "")
    .replace(/\/\/.*\n/gm, "")
    .replace(/\/\*.+?\*\//gs, "");
  const rootIndexLines = rootIndex.split("\n");

  for (const eachSubpackage of subpackages) {
    const expectedLine = `export * from "./${eachSubpackage}";`;
    let isRegistered = false;

    for (const eachLine of rootIndexLines) {
      if (eachLine === expectedLine) {
        isRegistered = true;
        break;
      }
    }

    if (!isRegistered) {
      throw new Error(
        `TEST FAILED: No "${expectedLine}" line found at root index.ts`
      );
    }
  }
});
