require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');

// Configuração do template engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexão com o banco de dados
db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    // Rotas da API
    const userRoutes = require('./routes/userRoutes');
    const taskRoutes = require('./routes/taskRoutes');
    const taskItemRoutes = require('./routes/taskItemRoutes');

    app.use('/users', userRoutes);
    app.use('/tasks', taskRoutes);
    app.use('/task-items', taskItemRoutes);

    // Rotas de frontend (se estiver usando páginas EJS)
    const frontendRoutes = require('./routes/frontRoutes');
    app.use('/', frontendRoutes);

    // Middleware para 404
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para erro interno
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    // Iniciar o servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
