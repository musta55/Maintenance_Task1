const fs = require('fs');
const path = require('path');
const diff = require('diff');

function compareFiles(file1Path, file2Path) {
  const file1Content = fs.readFileSync(file1Path, 'utf8');
  const file2Content = fs.readFileSync(file2Path, 'utf8');

  const differences = diff.diffLines(file1Content, file2Content);
  let output = "";
  let addedCount = 0;
  let removedCount = 0;

  differences.forEach(change => {
    if (change.added) {
      addedCount++;
      output += `Added in file ${file2Path} at line ${change.ln}: ${change.value}\n`;
    } else if (change.removed) {
      removedCount++;
      output += `Removed in file ${file1Path} at line ${change.ln}: ${change.value}\n`;
    }
  });

  return { output, addedCount, removedCount };
}

function compareFolders(folder1Path, folder2Path) {
  let folderAddedCount = 0;
  let folderRemovedCount = 0;
  const result = [];

  const filesInFolder1 = fs.readdirSync(folder1Path);

  filesInFolder1.forEach(file => {
    const file1Path = path.join(folder1Path, file);
    const file2Path = path.join(folder2Path, file);

    if (fs.existsSync(file2Path) && fs.lstatSync(file1Path).isFile() && fs.lstatSync(file2Path).isFile()) {
      const { output, addedCount, removedCount } = compareFiles(file1Path, file2Path);
      if (output !== "") {
        result.push({ file, output, addedCount, removedCount });
        folderAddedCount += addedCount;
        folderRemovedCount += removedCount;
      }
    } else if (fs.lstatSync(file1Path).isDirectory() && fs.existsSync(file2Path) && fs.lstatSync(file2Path).isDirectory()) {
      const { output, addedCount, removedCount } = compareFolders(file1Path, file2Path);
      if (output !== "") {
        result.push({ folder: file, output, addedCount, removedCount });
        folderAddedCount += addedCount;
        folderRemovedCount += removedCount;
      }
    }
  });

  let output = result.map(item => {
    if (item.file) {
      return `File: ${item.file}\nAdded Lines: ${item.addedCount}\nRemoved Lines: ${item.removedCount}\n\n${item.output}`;
    } else if (item.folder) {
      return `Folder: ${item.folder}\nAdded Lines: ${item.addedCount}\nRemoved Lines: ${item.removedCount}\n\n${item.output}`;
    }
  }).join("\n");

  return {
    output,
    addedCount: folderAddedCount,
    removedCount: folderRemovedCount
  };
}

// Replace 'folder1' and 'folder2' with the paths to your folders
const folder1Path = 'simple-music-player-app-in-c-sharp';
const folder2Path = 'simple-music-player-app-in-c-sharp copy';

const { output, addedCount, removedCount } = compareFolders(folder1Path, folder2Path);

console.log(`Total Added Lines in the folders: ${addedCount}`);
console.log(`Total Removed Lines in the folders: ${removedCount}`);
console.log(output);
