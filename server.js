// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const routes = require('./routes'); // <-- Centralizador de rotas
const frontRoutes = require('./routes/frontRoutes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configuração da engine de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/', frontRoutes);
app.use('/css', express.static(path.join(__dirname, 'views/css')));

// Conexão com o banco
db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    // Usar rotas com prefixo /api
    app.use('/api/users', require('./routes/userRoutes'));
    app.use('/api/tasks', require('./routes/taskRoutes'));
    app.use('/api/task-items', require('./routes/taskItemRoutes'));

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
