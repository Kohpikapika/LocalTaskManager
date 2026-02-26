-- Reset tasks table before inserting seed data
DELETE FROM tasks;
DELETE FROM sqlite_sequence WHERE name='tasks';

-- Initialize database connection
INSERT INTO tasks (title, completed) VALUES
  ('Learn SQLite basics', 0),
  ('Build CRUD API with Express', 1),
  ('Connect frontend to backend', 0),
  ('Refactor code to ES Modules', 1),
  ('Prepare README documentation', 0);