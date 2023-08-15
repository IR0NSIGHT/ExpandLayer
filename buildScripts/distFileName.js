const packageFile = require('../package.json');
const outFile = `dist/${packageFile.name.replace(" ","_")}_v${packageFile.version.replace(".","_")}.js`;
console.log(outFile)