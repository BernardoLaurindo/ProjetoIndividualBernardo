const taskModel = require('../models/taskModel');

const getAll = async (req, res) => {
  try {
    const tasks = await taskModel.getAll();
    res.status(200).json({ sucesso: true, tasks });
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const task = await taskModel.getById(req.params.id);
    if (task) {
      res.status(200).json({ sucesso: true, task });
    } else {
      res.status(404).json({ sucesso: false, error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { titulo, descricao, prazo, prioridade } = req.body;
    const newTask = await taskModel.createTask(titulo, descricao, prazo, prioridade);
    res.status(201).json({ sucesso: true, task: newTask });
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { titulo, descricao, prazo, prioridade } = req.body;
    const updatedTask = await taskModel.updateTask(req.params.id, titulo, descricao, prazo, prioridade);
    if (updatedTask) {
      res.status(200).json({ sucesso: true, task: updatedTask });
    } else {
      res.status(404).json({ sucesso: false, error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskModel.deleteTask(req.params.id);
    if (deletedTask) {
      res.status(200).json({ sucesso: true, task: deletedTask });
    } else {
      res.status(404).json({ sucesso: false, error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask
};