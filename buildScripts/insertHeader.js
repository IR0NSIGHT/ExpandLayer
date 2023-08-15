const fs = require('fs');
const assert = require("assert");

assert (process.argv.length === 5, "Usage: node insertHeader.js <bundleFile> <headerFile> <outFile>");

const bundleFile = process.argv[2];
const headerFile = process.argv[3];
const packageFile = require('../package.json');
const outFile = process.argv[4];

const scriptNameString = `//script.name=${packageFile.name} v${packageFile.version} by ${packageFile.author}`;
const scriptDescriptionString = `//script.description=${packageFile.description}`;

async function main() {
    const data = await fs.promises.readFile(bundleFile, 'utf8');
    const headerData = await fs.promises.readFile(headerFile, 'utf8');
    const modifiedContent = [scriptNameString, scriptDescriptionString,headerData,data].join('\n\n');
    await fs.promises.writeFile(outFile, modifiedContent, 'utf8');
}

main()

