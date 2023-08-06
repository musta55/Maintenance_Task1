const fs = require('fs');
const diff = require('diff');

function compareFiles(file1Path, file2Path) {
  const file1Content = fs.readFileSync(file1Path, 'utf8');
  const file2Content = fs.readFileSync(file2Path, 'utf8');

  const changes = diff.diffLines(file1Content, file2Content);
  let output = "";
  let addedCount = 0;
  let removedCount = 0;

  changes.forEach(change => {
    if (change.added) {
      const addedLines = change.value.match(/\n/g);
      addedCount += addedLines ? addedLines.length : 0;
      output += `Added:\n ${change.value}\n`;
    } else if (change.removed) {
      const removedLines = change.value.match(/\n/g);
      removedCount += removedLines ? removedLines.length : 0;
      output += `Removed:\n ${change.value}\n`;
    } else {
      output += `Unchanged:\n ${change.value}\n`;
    }
  });

  output = `File: ${file2Path}\nAdded Lines: ${addedCount}\nRemoved Lines: ${removedCount}\n\n${output}`;
  return output;
}

const file1Path = 'calculator.cs';
const file2Path = 'calculatorv2.cs';

const comparisonResult = compareFiles(file1Path, file2Path);
console.log(comparisonResult);
