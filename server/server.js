const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StudySync API is running");
});

app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("GET /api/tasks error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { title, course, due_date, status } = req.body;

  if (!title || !course || !due_date) {
    return res.status(400).json({
      error: "Title, course, and due date are required",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, course, due_date, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, course, due_date, status || "Pending"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("POST /api/tasks error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});