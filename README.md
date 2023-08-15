# Worldpainter Script Template

A repo template to use for developing WorldPainter scripts in typescript.
includes:
- typescript to ecma5.1 (worldpainter script standard)
- automated deploying releases to github when pushing a new tag
- automated unit tests on github
- npm scripts for compiling, building, testing, and deploying

downloads: https://github.com/IR0NSIGHT/BiomeStatistic/releases  
github: https://github.com/IR0NSIGHT/BiomeStatistic

# Deploying
```npm run deploy```
Will compile script to dist/myScript.js, add parameter header, add LICENSE and README to dist

```npm version <major|minor|patch> -m "bump %s, added cool new feature"```