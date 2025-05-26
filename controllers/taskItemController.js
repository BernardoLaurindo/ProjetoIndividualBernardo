const taskItemModel = require('../models/taskItemModel');

const getAllTaskItems = async (req, res) => {
  try {
    const items = await taskItemModel.getAllTaskItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskItemById = async (req, res) => {
  try {
    const item = await taskItemModel.getTaskItemById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item da tarefa não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTaskItem = async (req, res) => {
  try {
    const { task_id, user_id, type, content, file_url } = req.body;
    const newItem = await taskItemModel.createTaskItem(task_id, user_id, type, content, file_url);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskItem = async (req, res) => {
  try {
    const { task_id, user_id, type, content, file_url } = req.body;
    const updatedItem = await taskItemModel.updateTaskItem(req.params.id, task_id, user_id, type, content, file_url);
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item da tarefa não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTaskItem = async (req, res) => {
  try {
    const deletedItem = await taskItemModel.deleteTaskItem(req.params.id);
    if (deletedItem) {
      res.status(200).json(deletedItem);
    } else {
      res.status(404).json({ error: 'Item da tarefa não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTaskItems,
  getTaskItemById,
  createTaskItem,
  updateTaskItem,
  deleteTaskItem
};
