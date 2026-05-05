const pool = require("../config/db");

async function getAllTasks(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET /api/tasks error:", error);
    res.status(500).json({ error: "Server error while fetching tasks" });
  }
}

async function createTask(req, res) {
  const { title, course, due_date, status, userId } = req.body;

  if (!title || !course || !due_date || !userId) {
    return res.status(400).json({
      error: "Title, course, due date, and userId are required",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, course, due_date, status, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, course, due_date, status || "Pending", userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("POST /api/tasks error:", error);
    res.status(500).json({ error: "Server error while creating task" });
  }
}

async function updateTask(req, res) {
  const { id } = req.params;
  const { title, course, due_date, status, userId } = req.body;

  if (!title || !course || !due_date || !status || !userId) {
    return res.status(400).json({
      error: "Title, course, due date, status, and userId are required",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           course = $2,
           due_date = $3,
           status = $4
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [title, course, due_date, status, id, userId]
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
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
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