function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  return (
    <li>
      <strong>{task.title}</strong> — {task.status} — priority: {task.priority}
      <p>{task.description}</p>
      <button onClick={() => onToggleStatus(task)}>
        Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
      </button>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.task_id)}>Delete</button>
    </li>
  );
}

export default TaskItem;