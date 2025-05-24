// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const routes = require('./routes'); // <-- Centralizador de rotas

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco
db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    // Usar rotas com prefixo /api
    app.use('/api', routes);

    // Middleware para rota não encontrada
    app.use((req, res) => {
      res.status(404).json({ error: 'Rota não encontrada' });
    });

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
