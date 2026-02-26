## What
Simple task management API using SQLite.

## Features
- Create tasks
- List tasks
- Persistent storage with SQLite

## Why
To understand basic database operations
and backend fundamentals.

## Tech
- Node.js
- Express
- SQLite

## API Endpoints
- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

## How to run
### Prerequisites
- Node.js >= 18
- SQLite3
- `package.json` includes:
  ```json
  {
    "scripts": {
      "dev": "node index.js"
    }
  }
  ```

### Steps

1. Install dependencies

```bash
npm install
```

2. Initialize database
```bash
sqlite3 db.sqlite ".read schema.sql"
sqlite3 db.sqlite ".read seed.sql"
```

3. Start dev server
```bash
npm run dev
```

## Next
- Connect with frontend