const taskModel = require('../models/taskModel');

const getAll = async (req, res) => {
  try {
    const tasks = await taskModel.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const task = await taskModel.getById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, due_date, status, priority, category, tags, history, user_id } = req.body;
    const newTask = await taskModel.createTask(title, description, due_date, status, priority, category, tags, history, user_id);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, due_date, status, priority, category, tags, history, user_id } = req.body;
    const updatedTask = await taskModel.updateTask(req.params.id, title, description, due_date, status, priority, category, tags, history, user_id);
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskModel.deleteTask(req.params.id);
    if (deletedTask) {
      res.status(200).json(deletedTask);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask
};
