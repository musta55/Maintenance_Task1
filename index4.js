const fs = require('fs');

// Read the content of the C# file
const csharpCode = fs.readFileSync('calculator3.cs', 'utf8');

// Exclude comment lines (single and multi-line) and printf() lines
let withoutComments = csharpCode.replace(/\/\*.*?\*\/|\/\/.*/g, '');
withoutComments = withoutComments.split('\n').filter(line => !line.includes('printf(')).join('\n');

// Count the number of if, else if, and else statements
const numIf = (withoutComments.match(/\bif\b/g) || []).length;
const numElseIf = (withoutComments.match(/\belse if\b/g) || []).length;
const numElse = (withoutComments.match(/\belse\b/g) || []).length;

const cyclomaticComplexity = numIf + numElseIf + numElse + 1;

console.log(withoutComments);
console.log(`\n\nCyclomatic Complexity: ${cyclomaticComplexity}`);
