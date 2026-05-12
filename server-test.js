const express = require("express");
const app = express();

app.use(express.json());

// Rota de teste simples
app.get("/", (req, res) => {
  res.json({ message: "API está funcionando!" });
});

app.get("/jogos", (req, res) => {
  res.json([{ id: 1, nome: "Jogo de teste", tipo: "Teste", nota: 10, review: "Funcionou!" }]);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "usuario@esoft.com" && password === "Abc123") {
    return res.json({ token: "550e8400-e29b-41d4-a716-446655440000" });
  }
  res.status(401).json({ mensagem: "Email ou senha inválidos" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
