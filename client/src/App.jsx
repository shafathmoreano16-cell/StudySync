import { useEffect, useState } from "react";
import "./index.css";

const API_URL = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    due_date: "",
    status: "Pending",
  });

  async function fetchTasks() {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong");
        return;
      }

      setFormData({
        title: "",
        course: "",
        due_date: "",
        status: "Pending",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }
  function formatDate(dateString) {
  return dateString.split("T")[0];
  function formatDate(dateString) {
  return dateString.split("T")[0];
}
}

  return (
    <div className="app">
      <h1>StudySync</h1>
      <p className="subtitle">Student task tracker</p>

      <div className="quote-box">
        <p>Welcome back! Stay on top of your assignments.</p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
        />

        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      <h2>My Tasks</h2>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p><strong>Course:</strong> {task.course}</p>
              <p><strong>Due Date:</strong> {formatDate(task.due_date)}</p>
              <p><strong>Status:</strong> {task.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;