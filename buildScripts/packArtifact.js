const fs = require('fs');
const assert = require("assert");
const { execSync } = require('child_process');

// Specify the file path and the string to prepend
console.log(process.argv);
assert (process.argv.length === 4, "Usage: node insertHeader.js <bundleFile> <headerFile> <outFile>");

const bundleFile = process.argv[2];
const headerFile = process.argv[3];
const packageFile = require('../package.json');
const outFile = process.argv[4];