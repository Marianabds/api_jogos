const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const authRoutes = require("./database/controllers/AuthController");

const app = express();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Banco de dados SQLite conectado!");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS jogos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL,
      nota INTEGER NOT NULL,
      review TEXT NOT NULL
    )
  `);
});

app.use(express.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use(authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API está funcionando!"
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
