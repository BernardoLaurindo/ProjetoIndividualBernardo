const express = require('express');
const router = express.Router();

// Página de login
router.get('/login', (req, res) => {
  res.render('layout/main', {
    pageTitle: 'Página Inicial',
    content: 'pages/login',
    stylesheet: 'profile.css'
  });
});

// Página de cadastro
router.get('/cadastro', (req, res) => {
  res.render('layout/main', {
    pageTitle: 'Cadastro',
    content: 'pages/cadastro',
    stylesheet: 'profile.css'
  });
});

// Dashboard
router.get('/menu', (req, res) => {
  res.render('layout/main', {
    pageTitle: 'Dashboard',
    content: 'pages/dashboard',
    stylesheet: 'dashboard.css'
  });
});

// Minhas Tasks
router.get('/minhas-tasks', (req, res) => {
  res.render('layout/main', {
    pageTitle: 'Minhas Tasks',
    content: 'pages/minhasTasks',
    stylesheet: 'minhasTasks.css',
    tarefas: [] // ou um array de tarefas reais se houver
  });
});

// Nova Task
router.get('/nova-task', (req, res) => {
  res.render('layout/main', {
    pageTitle: 'Nova Task',
    content: 'pages/novaTask',
    stylesheet: 'novaTask.css'
  });
});

module.exports = router;