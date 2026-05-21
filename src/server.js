const express = require("express");
const authRoutes = require("./database/controllers/AuthController");

const app = express();

// Middleware para JSON
app.use(express.json());

// Usar as rotas da API
app.use(authRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API funcionando no Render!"
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
