function TaskCard({ task, onDelete, onEdit }) {
  function formatDate(dateString) {
    return dateString.split("T")[0];
  }

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p><strong>Course:</strong> {task.course}</p>
      <p><strong>Due Date:</strong> {formatDate(task.due_date)}</p>
      <p><strong>Status:</strong> {task.status}</p>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;