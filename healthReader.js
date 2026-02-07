const fs = require("fs/promises");

async function readHealthData(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf-8");

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(`Invalid JSON format in file: ${filePath}`);
    }

    let entries = [];
    if (Array.isArray(data)) entries = data;
    else if (data && Array.isArray(data.entries)) entries = data.entries;
    else if (data && Array.isArray(data.data)) entries = data.data;
    else {
      throw new Error(
        `Unexpected JSON structure in file: ${filePath} (expected an array or {entries:[]})`
      );
    }

    return { count: entries.length, entries };
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(`Health file not found: ${filePath}`);
    }
    throw err;
  }
}

async function healthEntryCounter(filePath) {
  const { count } = await readHealthData(filePath);
  console.log(`Total health entries: ${count}`);
  return count;
}

module.exports = { readHealthData, healthEntryCounter };
