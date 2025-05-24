// routes/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const taskItemRoutes = require('./taskItemRoutes');

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/task-items', taskItemRoutes);

module.exports = router;
