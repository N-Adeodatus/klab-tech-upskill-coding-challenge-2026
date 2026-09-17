const pool = require('./db');
async function getAllTasks(statusFilter) {
    if (statusFilter) {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE status = ?', [statusFilter]);
        return rows;
    }
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
}

async function getTaskById(id) {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
}

async function createTask(title, description, priority, status = 'pending') {
    const [result] = await pool.query('INSERT INTO tasks (title, description, priority, status) VALUES (?, ?, ?, ?)', [title, description, priority, status]);
    return getTaskById(result.insertId);
}

async function updateTask(id, fields) {
    const existing = await getTaskById(id);
    if (!existing) return null;
    const merged = { ...existing, ...fields };
    await pool.query('UPDATE tasks SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?', [merged.title, merged.description, merged.priority, merged.status, id]);
    return getTaskById(id);
}

async function deleteTask(id) {
    const existing = await getTaskById(id);
    if (!existing) return null;
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
