const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('db.sqlite');

app.use(express.json());

// table作成
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`).run();

// 一覧取得
app.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  res.json(tasks);
});

// 追加
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.prepare('INSERT INTO tasks (title) VALUES (?)').run(title);
  res.json({ message: 'Task added' });
});

// 完了状態更新（PUT）
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

// 削除（DELETE）
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