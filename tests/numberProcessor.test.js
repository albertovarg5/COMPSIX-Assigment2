const {
  parseNumbers,
  sumNumbers,
  findMinMax,
  averageNumbers,
} = require("../src/numberProcessor");

describe("Number Processor", () => {
  test("parses numbers correctly", () => {
    expect(parseNumbers("1\n2\n3\n")).toEqual([1, 2, 3]);
    expect(parseNumbers("  4 \n\n 5\n")).toEqual([4, 5]);
  });

  test("sumNumbers sums correctly", () => {
    expect(sumNumbers([1, 2, 3])).toBe(6);
    expect(sumNumbers([])).toBe(0);
  });

  test("findMinMax finds min and max", () => {
    expect(findMinMax([4, 1, 9])).toEqual({ min: 1, max: 9 });
    expect(findMinMax([])).toEqual({ min: null, max: null });
  });

  test("averageNumbers calculates average", () => {
    expect(averageNumbers([2, 4, 6])).toBe(4);
    expect(averageNumbers([])).toBe(0);
  });
});
