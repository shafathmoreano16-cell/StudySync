const fs = require("fs");
const pool = require("./config/db");

async function initDatabase() {
  try {
    const sql = fs.readFileSync("./schema.sql", "utf8");
    await pool.query(sql);
    console.log("Tasks table created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    await pool.end();
  }
}

initDatabase();