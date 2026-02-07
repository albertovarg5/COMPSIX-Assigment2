// workoutReader.js
const fs = require("fs");
const csv = require("csv-parser");

function readWorkoutData(filePath) {
  return new Promise((resolve, reject) => {
    const workouts = [];
    let count = 0;
    let totalMinutes = 0;

    const stream = fs.createReadStream(filePath);

    stream.on("error", (err) => {
      if (err.code === "ENOENT") {
        reject(new Error(`Workout file not found: ${filePath}`));
      } else {
        reject(new Error(`Unable to read workout file: ${filePath}`));
      }
    });

    stream
      .pipe(csv())
      .on("data", (row) => {
        workouts.push(row);
        count++;

        const minutesKey = Object.keys(row).find(
          (k) => k.toLowerCase() === "minutes"
        );

        const val = minutesKey ? Number(row[minutesKey]) : NaN;
        if (!Number.isNaN(val)) totalMinutes += val;
      })
      .on("error", () => {
        reject(
          new Error(`CSV parsing failed (file may be corrupted): ${filePath}`)
        );
      })
      .on("end", () => {
        resolve({ count, totalMinutes, workouts });
      });
  });
}

async function workoutCalculator(filePath) {
  const { count, totalMinutes } = await readWorkoutData(filePath);
  console.log(`Total workouts: ${count}`);
  console.log(`Total minutes: ${totalMinutes}`);
  return { count, totalMinutes };
}

module.exports = { readWorkoutData, workoutCalculator };

