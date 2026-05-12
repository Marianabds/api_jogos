const express = require("express");
const Database = require('better-sqlite3');
const path = require('path');
const bodyParser = require("body-parser");
const authRoutes = require("./database/controllers/AuthController");

const app = express();

// Usar caminho persistente no Railway ou local
const dbPath = process.env.DATABASE_PATH || './database.db';
console.log(`📁 Banco de dados em: ${dbPath}`);

const db = new Database(dbPath);

console.log('✅ Banco de dados SQLite conectado!');

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

module.exports = { db };
