const express = require("express");
const Database = require('better-sqlite3');
const bodyParser = require("body-parser");
const authRoutes = require("./src/database/controllers/AuthController"); // ← COM src/

const app = express();

const dbPath = process.env.DATABASE_PATH || './database.db';
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS jogos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    tipo TEXT,
    nota INTEGER,
    review TEXT
  )
`);

app.use(bodyParser.json());
app.use(authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
