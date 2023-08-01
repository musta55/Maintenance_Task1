const fs = require('fs');
const sloc = require('sloc');

// Replace 'your_cs_file.cs' with the path to your C# file
const filePath = 'calculator.cs';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
  } else {
    const linesOfCode = sloc(data, 'cs');
    console.log('Source Lines of Code (SLOC):', linesOfCode.source);
  }
});
