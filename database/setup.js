const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "university.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      courseCode TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      credits INTEGER NOT NULL,
      description TEXT NOT NULL,
      semester TEXT NOT NULL
    )
  `);

  console.log("✅ Database created and courses table ready.");
});

db.close();