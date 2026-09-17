import { useEffect, useState } from 'react';
import './TaskForm.css';

function TaskForm({ initialValues, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    setTitle(initialValues?.title || '');
    setDescription(initialValues?.description || '');
    setPriority(initialValues?.priority || 'medium');
  }, [initialValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('medium');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low priority</option>
        <option value="medium">Medium priority</option>
        <option value="high">High priority</option>
      </select>
      <div className="task-form-actions">
        <button type="submit">{initialValues ? 'Update task' : 'Add task'}</button>
        {initialValues && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default TaskForm;