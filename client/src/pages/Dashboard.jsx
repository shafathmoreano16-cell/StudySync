import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import QuoteBox from "../components/QuoteBox";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";
import { getQuote } from "../services/quoteService";

function Dashboard({ currentUser, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("");

  const [quote, setQuote] = useState({
    text: "Stay focused and keep going.",
    author: "StudySync",
  });
  const [quoteLoading, setQuoteLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    due_date: "",
    status: "Pending",
  });

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  async function loadQuote() {
    try {
      setQuoteLoading(true);
      const data = await getQuote();
      setQuote(data);
    } catch (error) {
      console.error("Error loading quote:", error);
      setQuote({
        text: "Stay focused and keep going.",
        author: "StudySync",
      });
    } finally {
      setQuoteLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
    loadQuote();
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
      if (editingTaskId) {
        await updateTask(editingTaskId, formData);
      } else {
        await createTask(formData);
      }

      setFormData({
        title: "",
        course: "",
        due_date: "",
        status: "Pending",
      });

      setEditingTaskId(null);
      loadTasks();
    } catch (error) {
      console.error("Error saving task:", error);
      alert(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(error.message);
    }
  }

  function handleEdit(task) {
    setEditingTaskId(task.id);
    setFormData({
      title: task.title,
      course: task.course,
      due_date: task.due_date.split("T")[0],
      status: task.status,
    });
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesCourse = task.course
      .toLowerCase()
      .includes(courseFilter.toLowerCase());

    return matchesStatus && matchesCourse;
  });

  const activeTasks = filteredTasks.filter(
    (task) => task.status !== "Completed"
  );

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "Completed"
  );

  return (
    <div className="app">
      <div className="top-bar">
        <div>
          <h1>StudySync</h1>
          <p className="subtitle">Welcome, {currentUser.username}</p>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <QuoteBox
        quote={quote}
        loading={quoteLoading}
        onNewQuote={loadQuote}
      />

      <TaskForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={editingTaskId !== null}
      />

      <FilterBar
        statusFilter={statusFilter}
        courseFilter={courseFilter}
        onStatusChange={(e) => setStatusFilter(e.target.value)}
        onCourseChange={(e) => setCourseFilter(e.target.value)}
      />

      <h2>Active Tasks</h2>
      <TaskList
        tasks={activeTasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <h2>Completed Tasks</h2>
      <TaskList
        tasks={completedTasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Dashboard;