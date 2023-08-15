FILE=$(node ./buildScripts/distFileName.js)
cp README.md dist/README.md
cp LICENSE dist/LICENSE
cd dist
rm -f MyScript.js

zip -r ../$FILE.zip .