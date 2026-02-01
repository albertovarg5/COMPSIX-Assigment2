const {
  countWords,
  findLongestWord,
  countLines,
} = require("../src/textAnalyzer");

describe("Text Analyzer", () => {
  test("counts words correctly", () => {
    expect(countWords("Hello world")).toBe(2);
    expect(countWords("One, two, three!")).toBe(3);
    expect(countWords("")).toBe(0);
    expect(countWords("   ")).toBe(0);
  });

  test("finds the longest word", () => {
    expect(findLongestWord("I love programming")).toBe("programming");
    expect(findLongestWord("don't stop")).toBe("don't");
    expect(findLongestWord("")).toBe("");
    expect(findLongestWord("...!!!")).toBe("");
  });

  test("counts lines correctly", () => {
    expect(countLines("")).toBe(0);
    expect(countLines("one")).toBe(1);
    expect(countLines("one\ntwo\nthree")).toBe(3);
  });
});
