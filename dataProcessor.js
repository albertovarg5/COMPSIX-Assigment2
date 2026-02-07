require("dotenv").config();

const { workoutCalculator } = require("./workoutReader");
const { healthEntryCounter } = require("./healthReader");

async function processFiles() {
  const userName = process.env.USER_NAME || "User";
  const weeklyGoal = Number(process.env.WEEKLY_GOAL || 0);

  const workoutPath = "./data/workouts.csv";
  const healthPath = "./data/health.json"; // change this if your file name differs

  try {
    console.log(`Processing data for: ${userName}`);
    console.log("📁 Reading workout data...");
    const { count: workoutCount, totalMinutes } = await workoutCalculator(workoutPath);

    console.log("📁 Reading health data...");
    const healthCount = await healthEntryCounter(healthPath);

    console.log("\n=== SUMMARY ===");
    console.log(`Workouts found: ${workoutCount}`);
    console.log(`Total workout minutes: ${totalMinutes}`);
    console.log(`Health entries found: ${healthCount}`);
    console.log(`Weekly goal: ${weeklyGoal} minutes`);

    if (weeklyGoal > 0 && totalMinutes >= weeklyGoal) {
      console.log(`🎉 Congratulations ${userName}! You have exceeded your weekly goal!`);
    } else if (weeklyGoal > 0) {
      console.log(
        `💪 Keep going ${userName}! You need ${weeklyGoal - totalMinutes} more minutes to hit your goal.`
      );
    } else {
      console.log("⚠️ WEEKLY_GOAL is not set or invalid in your .env file.");
    }
  } catch (err) {
    console.error("❌ Error processing files:", err.message);
    console.error("Tip: Check your ./data filenames and that JSON/CSV are valid.");
  }
}

if (require.main === module) {
  processFiles();
}

module.exports = { processFiles };
