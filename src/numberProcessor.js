const fs = require("fs");

/**
 * Converts text to array of numbers
 */
function parseNumbers(text) {
  if (!text) return [];

  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(Number);
}

/**
 * Sum of numbers
 */
function sumNumbers(numbers) {
  return numbers.reduce((sum, n) => sum + n, 0);
}

/**
 * Finds min and max
 */
function findMinMax(numbers) {
  if (numbers.length === 0) return { min: null, max: null };
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}

/**
 * Calculates average
 */
function averageNumbers(numbers) {
  if (numbers.length === 0) return 0;
  return sumNumbers(numbers) / numbers.length;
}

/**
 * Reads numbers file
 */
function readNumberFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  return parseNumbers(text);
}

// Manual verification
if (require.main === module) {
  const nums = readNumberFile("data/sample-numbers.txt");
  console.log(sumNumbers(nums));
  console.log(findMinMax(nums));
  console.log(averageNumbers(nums));
}

module.exports = {
  parseNumbers,
  sumNumbers,
  findMinMax,
  averageNumbers,
  readNumberFile,
};
