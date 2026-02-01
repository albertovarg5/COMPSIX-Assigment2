const fs = require("fs");

/**
 * Counts total words in a string
 */
function countWords(text) {
  if (!text) return 0;
  const words = text.match(/[A-Za-z0-9']+/g);
  return words ? words.length : 0;
}

/**
 * Finds the longest word in a string
 */
function findLongestWord(text) {
  if (!text) return "";
  const words = text.match(/[A-Za-z0-9']+/g);
  if (!words) return "";

  return words.reduce((longest, word) =>
    word.length > longest.length ? word : longest
  );
}

/**
 * Counts how many lines are in a string
 */
function countLines(text) {
  if (!text) return 0;
  return text.replace(/\r\n/g, "\n").split("\n").length;
}

/**
 * Reads a text file
 */
function readTextFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

// Manual verification
if (require.main === module) {
  const text = readTextFile("data/sample-text.txt");
  console.log(countWords(text));
  console.log(findLongestWord(text));
  console.log(countLines(text));
}

module.exports = {
  countWords,
  findLongestWord,
  countLines,
  readTextFile,
};
