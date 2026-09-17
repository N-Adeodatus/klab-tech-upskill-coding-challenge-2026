import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css';

const API_URL = 'http://localhost:3000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  async function fetchTasks() {
    const url = statusFilter === 'all' ? API_URL : `${API_URL}?status=${statusFilter}`;
    const res = await fetch(url);
    const data = await res.json();
    setTasks(data);
  }

  async function handleCreate(task) {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    fetchTasks();
  }

  async function handleUpdate(task_id, fields) {
    await fetch(`${API_URL}/${task_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    setEditingTask(null);
    fetchTasks();
  }

  async function handleDelete(task_id) {
    await fetch(`${API_URL}/${task_id}`, { method: 'DELETE' });
    fetchTasks();
  }

  function handleToggleStatus(task) {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    handleUpdate(task.task_id, { status: newStatus });
  }

  return (
    <div className="app">
      <h1 className="app-title">Task Manager</h1>

      <div className="filter-row">
        <label>Filter</label>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <TaskForm
        initialValues={editingTask}
        onSubmit={editingTask
          ? (fields) => handleUpdate(editingTask.task_id, fields)
          : handleCreate}
        onCancel={() => setEditingTask(null)}
      />

      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}

export default App;