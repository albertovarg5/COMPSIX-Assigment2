const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "database", "university.db");
const db = new sqlite3.Database(dbPath);

/*
GET /api/courses - get all courses
*/
app.get("/api/courses", (req, res) => {
  db.all("SELECT * FROM courses", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/*
GET /api/courses/:id - get one course
*/
app.get("/api/courses/:id", (req, res) => {
  const id = Number(req.params.id);

  db.get("SELECT * FROM courses WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Course not found" });

    res.json(row);
  });
});

/*
POST /api/courses - create course
*/
app.post("/api/courses", (req, res) => {
  const { courseCode, title, credits, description, semester } = req.body;

  if (!courseCode || !title || credits === undefined || !description || !semester) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO courses (courseCode, title, credits, description, semester)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [courseCode, title, credits, description, semester], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      id: this.lastID,
      courseCode,
      title,
      credits,
      description,
      semester
    });
  });
});

/*
PUT /api/courses/:id - update course
*/
app.put("/api/courses/:id", (req, res) => {
  const id = Number(req.params.id);
  const { courseCode, title, credits, description, semester } = req.body;

  if (!courseCode || !title || credits === undefined || !description || !semester) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    UPDATE courses
    SET courseCode = ?, title = ?, credits = ?, description = ?, semester = ?
    WHERE id = ?
  `;

  db.run(sql, [courseCode, title, credits, description, semester, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Course not found" });

    res.json({ message: "Course updated successfully" });
  });
});

/*
DELETE /api/courses/:id - delete course
*/
app.delete("/api/courses/:id", (req, res) => {
  const id = Number(req.params.id);

  db.run("DELETE FROM courses WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Course not found" });

    res.status(204).send();
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});