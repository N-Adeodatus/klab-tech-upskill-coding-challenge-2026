# Task Manager

A full-stack task management application built as a coding challenge. This project includes a React frontend and a Node.js backend connected to a MySQL database.

## Technologies Used

### Frontend

- React
- Vite
- JavaScript (JSX)
- CSS
- Fetch API for backend communication

### Backend

- Node.js
- Native Node.js HTTP server
- JavaScript (CommonJS)
- `mysql2` for MySQL database access

### Database

- MySQL

## Project Structure

```text
.
├── README.md
├── backend
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── taskModel.js
└── frontend
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.js
    ├── public
    └── src
        ├── App.jsx
        ├── TaskForm.jsx
        ├── TaskItem.jsx
        ├── TaskList.jsx
        └── ...
```

## Features

- Create tasks
- View all tasks
- View tasks by ID through the API
- Edit tasks
- Delete tasks
- Mark tasks as pending or completed
- Set task priority to low, medium, or high
- Filter tasks by status
- Store tasks persistently in MySQL

## How to Install and Run the Project

### Prerequisites

Make sure the following are installed:

- Node.js and npm
- MySQL

### 1. Clone the repository

```bash
git clone https://github.com/N-Adeodatus/klab-tech-upskill-coding-challenge-2026
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

The backend uses the `mysql2` package to connect to MySQL.

### 3. Install frontend dependencies

Open another terminal, or return to the project root:

```bash
cd frontend
npm install
```

### 4. Set up the database

Start your MySQL server and create the database:

```sql
CREATE DATABASE task_manager_db;
```

Select the database:

```sql
USE task_manager_db;
```

Create the tasks table:

```sql
CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
    status ENUM('pending', 'completed') NOT NULL DEFAULT 'pending'
);
```

The backend is currently configured to connect to MySQL using:

- Host: `localhost`
- User: `root`
- Password: `password`
- Database: `task_manager_db`

These settings are defined in `backend/db.js`. If your MySQL username or password is different, update that file before starting the backend.

### 5. Start the backend

From the backend directory:

```bash
node server.js
```

The API will run at:

```text
http://localhost:3000
```

### 6. Start the frontend

From the frontend directory:

```bash
npm run dev
```

Vite will display the local development URL in the terminal, usually:

```text
http://localhost:5173
```

Open that URL in a browser.

## API Endpoints

The backend exposes the following task endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks?status=pending` | Get tasks filtered by status |
| GET | `/tasks/:id` | Get a specific task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

A task contains the following fields:

```json
{
  "title": "Example task",
  "description": "Example description",
  "priority": "medium",
  "status": "pending"
}
```

When creating a task, `status` defaults to `pending` if it is not provided.

## Important Technical Decisions

### Simple Node.js HTTP Server

The backend uses Node.js's built-in `http` module instead of a web framework. This keeps the API implementation lightweight and makes request handling and HTTP methods explicit.

### Separate Database Model

Database operations are kept in `taskModel.js`, while `server.js` is responsible for handling HTTP requests and responses. This separates API logic from database logic.

### MySQL Connection Pool

The backend uses a MySQL connection pool through `mysql2/promise`. This allows database queries to be handled asynchronously while reusing database connections.

### REST-style API

The application uses HTTP methods to represent operations on tasks:

- `GET` for retrieving tasks
- `POST` for creating tasks
- `PUT` for updating tasks
- `DELETE` for deleting tasks

### React Component Structure

The frontend is divided into components with separate responsibilities:

- `App.jsx` manages application state and API communication.
- `TaskForm.jsx` handles creating and editing tasks.
- `TaskList.jsx` renders the collection of tasks.
- `TaskItem.jsx` renders an individual task and its actions.

### Status Filtering

The frontend requests filtered tasks from the backend instead of downloading every task and filtering them only in the browser. The selected status is passed as a query parameter such as `/tasks?status=pending`.

### CORS Support

The backend enables CORS because the React development server and API server run on different ports during development.

## Additional Notes

- The backend must be running for the frontend to load and modify tasks.
- Make sure MySQL is running before starting the backend.
- The frontend currently expects the API at `http://localhost:3000/tasks`.
- The database credentials in `backend/db.js` are development settings. For production, credentials should be moved to environment variables rather than being stored directly in source code.
