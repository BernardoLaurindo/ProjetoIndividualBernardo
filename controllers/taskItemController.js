const taskItemService = require('../models/taskItemModel');

const getAllTaskItems = async (req, res) => {
  try {
    const items = await taskItemService.getAllTaskItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskItemById = async (req, res) => {
  try {
    const item = await taskItemService.getTaskItemById(req.params.id);
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
    const newItem = await taskItemService.createTaskItem(task_id, user_id, type, content, file_url);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskItem = async (req, res) => {
  try {
    const { task_id, user_id, type, content, file_url } = req.body;
    const updatedItem = await taskItemService.updateTaskItem(req.params.id, task_id, user_id, type, content, file_url);
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
    const deletedItem = await taskItemService.deleteTaskItem(req.params.id);
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
