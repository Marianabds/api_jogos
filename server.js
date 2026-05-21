const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/database/controllers/AuthController");

const app = express();

// Configuração do CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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