const pool = require("../config/db");

async function getAllTasks(req, res) {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET /api/tasks error:", error);
    res.status(500).json({ error: "Server error while fetching tasks" });
  }
}

async function createTask(req, res) {
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
    res.status(500).json({ error: "Server error while creating task" });
  }
}

async function updateTask(req, res) {
  const { id } = req.params;
  const { title, course, due_date, status } = req.body;

  if (!title || !course || !due_date || !status) {
    return res.status(400).json({
      error: "Title, course, due date, and status are required",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           course = $2,
           due_date = $3,
           status = $4
       WHERE id = $5
       RETURNING *`,
      [title, course, due_date, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("PUT /api/tasks/:id error:", error);
    res.status(500).json({ error: "Server error while updating task" });
  }
}

async function deleteTask(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      deletedTask: result.rows[0],
    });
  } catch (error) {
    console.error("DELETE /api/tasks/:id error:", error);
    res.status(500).json({ error: "Server error while deleting task" });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};