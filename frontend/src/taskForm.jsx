import { useEffect, useState } from 'react';

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
    <form onSubmit={handleSubmit}>
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
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">{initialValues ? 'Update Task' : 'Add Task'}</button>
      {initialValues && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default TaskForm;