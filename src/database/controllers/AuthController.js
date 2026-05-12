const express = require("express");
const router = express.Router();
const Database = require('better-sqlite3');

// Conectar ao banco (mesma conexão do server, ou cria uma nova)
const db = new Database('./database.db');
const dbPath = process.env.DATABASE_PATH || './database.db';

function formatarJogo(jogo) {
  return {
    id: jogo.id,
    nome: jogo.nome,
    tipo: jogo.tipo,
    nota: jogo.nota,
    review: jogo.review
  };
}

// Rota de login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "usuario@esoft.com" && password === "Abc123") {
    return res.status(200).json({
      token: "550e8400-e29b-41d4-a716-446655440000" // UUID fixo
    });
  }

  return res.status(401).json({
    mensagem: "Email ou senha inválidos"
  });
});

// Listar todos os jogos
router.get("/jogos", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM jogos ORDER BY id DESC");
    const rows = stmt.all();
    res.status(200).json(rows.map(formatarJogo));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar jogos", error: err.message });
  }
});

// Buscar jogo por ID
router.get("/jogos/:id", (req, res) => {
  const { id } = req.params;
  
  try {
    const stmt = db.prepare("SELECT * FROM jogos WHERE id = ?");
    const row = stmt.get(id);
    
    if (!row) {
      return res.status(404).json({ message: "Jogo não encontrado" });
    }
    res.status(200).json(formatarJogo(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar jogo", error: err.message });
  }
});

// Cadastrar novo jogo
router.post("/jogos", (req, res) => {
  const { nome, tipo, nota, review } = req.body;

  if (!nome || !tipo || !nota || !review) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios."
    });
  }

  if (isNaN(nota)) {
    return res.status(400).json({ mensagem: "A nota deve ser um número válido." });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO jogos (nome, tipo, nota, review) VALUES (?, ?, ?, ?)"
    );
    const info = stmt.run(nome, tipo, nota, review);
    
    res.status(201).json({
      id: info.lastInsertRowid,
      nome,
      tipo,
      nota,
      review
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao adicionar jogo", error: err.message });
  }
});

// Atualizar jogo
router.put("/jogos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, tipo, nota, review } = req.body;

  if (!nome || !tipo || !nota || !review) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios."
    });
  }

  try {
    const stmt = db.prepare(
      "UPDATE jogos SET nome = ?, tipo = ?, nota = ?, review = ? WHERE id = ?"
    );
    const result = stmt.run(nome, tipo, nota, review, id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: "Jogo não encontrado" });
    }
    
    res.status(200).json({ id, nome, tipo, nota, review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar jogo", error: err.message });
  }
});

// Deletar jogo
router.delete("/jogos/:id", (req, res) => {
  const { id } = req.params;
  
  try {
    const stmt = db.prepare("DELETE FROM jogos WHERE id = ?");
    const result = stmt.run(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: "Jogo não encontrado" });
    }
    
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao remover jogo", error: err.message });
  }
});

module.exports = router;