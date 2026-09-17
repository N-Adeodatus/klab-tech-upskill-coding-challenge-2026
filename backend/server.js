const http = require('http');
const url = require('url');
const taskModel = require('./taskModel');

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                reject(err);
            }
        });
    });
}

const server = http.createServer(async (req, res) => {
    // CORS headers — required for the React dev server (different port) to call this API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Browsers send an OPTIONS preflight before PUT/DELETE/POST — must answer it directly
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const parsedUrl = url.parse(req.url, true);
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean); // e.g. ['tasks', '5']
    const method = req.method;

    try {
        if (pathParts[0] !== 'tasks') {
            return sendJSON(res, 404, { error: 'Not found' });
        }

        // GET /tasks or GET /tasks?status=pending
        if (method === 'GET' && pathParts.length === 1) {
            const tasks = await taskModel.getAllTasks(parsedUrl.query.status);
            return sendJSON(res, 200, tasks);
        }

        // GET /tasks/:id
        if (method === 'GET' && pathParts.length === 2) {
            const task = await taskModel.getTaskById(pathParts[1]);
            if (!task) return sendJSON(res, 404, { error: 'Task not found' });
            return sendJSON(res, 200, task);
        }

        // POST /tasks
        if (method === 'POST' && pathParts.length === 1) {
            const body = await readBody(req);
            const task = await taskModel.createTask(body);
            return sendJSON(res, 201, task);
        }

        // PUT /tasks/:id
        if (method === 'PUT' && pathParts.length === 2) {
            const body = await readBody(req);
            const task = await taskModel.updateTask(pathParts[1], body);
            if (!task) return sendJSON(res, 404, { error: 'Task not found' });
            return sendJSON(res, 200, task);
        }

        // DELETE /tasks/:id
        if (method === 'DELETE' && pathParts.length === 2) {
            const success = await taskModel.deleteTask(pathParts[1]);
            if (!success) return sendJSON(res, 404, { error: 'Task not found' });
            return sendJSON(res, 204, null);
        }

        sendJSON(res, 404, { error: 'Not found' });
    } catch (err) {
        console.error(err);
        sendJSON(res, 500, { error: 'Server error' });
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});