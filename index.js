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

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});