const fs = require("fs/promises");
const path = require("path");
const { readHealthData } = require("../healthReader");

describe("healthReader", () => {
  const tmpDir = path.join(__dirname, "__tmp__");
  const goodFile = path.join(tmpDir, "good-health.json");
  const badFile = path.join(tmpDir, "bad-health.json");
  const missingFile = path.join(tmpDir, "missing-health.json");

  beforeAll(async () => {
    await fs.mkdir(tmpDir, { recursive: true });
    await fs.writeFile(
      goodFile,
      JSON.stringify([{ a: 1 }, { a: 2 }, { a: 3 }]),
      "utf-8"
    );
    await fs.writeFile(badFile, "{not valid json", "utf-8");
  });

  afterAll(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  test("reads valid JSON and returns count", async () => {
    const result = await readHealthData(goodFile);
    expect(result.count).toBe(3);
    expect(Array.isArray(result.entries)).toBe(true);
  });

  test("throws error for missing file", async () => {
    await expect(readHealthData(missingFile)).rejects.toThrow("Health file not found");
  });

  test("throws error for invalid JSON", async () => {
    await expect(readHealthData(badFile)).rejects.toThrow("Invalid JSON format");
  });
});



