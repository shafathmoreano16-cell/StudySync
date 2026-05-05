function FilterBar({
  statusFilter,
  courseFilter,
  onStatusChange,
  onCourseChange,
}) {
  return (
    <div className="filter-bar">
      <select value={statusFilter} onChange={onStatusChange}>
        <option value="All">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="text"
        placeholder="Filter by course"
        value={courseFilter}
        onChange={onCourseChange}
      />
    </div>
  );
}

export default FilterBar;