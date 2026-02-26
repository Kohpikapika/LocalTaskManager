import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('db.sqlite');

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

// Create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`).run();

// Get list
app.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  res.json(tasks);
});

// Add
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.prepare('INSERT INTO tasks (title) VALUES (?)').run(title);
  res.json({ message: 'Task added' });
});

// Update status（PUT）
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'completed must be boolean' });
  }

  const result = db
    .prepare('UPDATE tasks SET completed = ? WHERE id = ?')
    .run(completed ? 1 : 0, id);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json({ message: 'Task updated' });
});

// DELETE
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  const result = db
    .prepare('DELETE FROM tasks WHERE id = ?')
    .run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json({ message: 'Task deleted' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});