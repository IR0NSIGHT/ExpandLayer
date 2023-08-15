FILE=$(node ./buildScripts/distFileName.js)
node buildScripts/insertHeader.js dist/MyScript.js src/header.js $FILE
