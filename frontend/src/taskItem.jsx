import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  return (
    <li className={`task-item priority-${task.priority} status-${task.status}`}>
      <div className="task-item-body">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">{task.status} · {task.priority} priority</div>
        <p className="task-description">{task.description}</p>
      </div>
      <div className="task-item-actions">
        <button onClick={() => onToggleStatus(task)}>
          Mark {task.status === 'pending' ? 'completed' : 'pending'}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(task.task_id)}>Delete</button>
      </div>
    </li>
  );
}

export default TaskItem;