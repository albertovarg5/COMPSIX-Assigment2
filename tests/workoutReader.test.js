const fs = require("fs/promises");
const path = require("path");
const { readWorkoutData } = require("../workoutReader");

describe("workoutReader", () => {
  const tmpDir = path.join(__dirname, "__tmp__");
  const goodFile = path.join(tmpDir, "workouts.csv");
  const missingFile = path.join(tmpDir, "missing.csv");

  beforeAll(async () => {
    await fs.mkdir(tmpDir, { recursive: true });

    const csvContent = [
      "date,type,minutes",
      "2026-01-01,run,30",
      "2026-01-02,bike,45",
      "2026-01-03,lift,60",
    ].join("\n");

    await fs.writeFile(goodFile, csvContent, "utf-8");
  });

  afterAll(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  test("reads valid CSV and returns count + totalMinutes", async () => {
    const result = await readWorkoutData(goodFile);
    expect(result.count).toBe(3);
    expect(result.totalMinutes).toBe(135);
    expect(Array.isArray(result.workouts)).toBe(true);
  });

  test("throws error for missing file", async () => {
    await expect(readWorkoutData(missingFile)).rejects.toThrow("Workout file not found");
  });
});



