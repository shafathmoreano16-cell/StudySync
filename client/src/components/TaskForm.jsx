function TaskForm({ formData, onChange, onSubmit, isEditing }) {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={onChange}
      />

      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={onChange}
      />

      <input
        type="date"
        name="due_date"
        value={formData.due_date}
        onChange={onChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={onChange}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;