const express = require('express');
const router = express.Router();
const taskItemController = require('../controllers/taskItemController');

router.get('/', taskItemController.getAllTaskItems);
router.get('/:id', taskItemController.getTaskItemById);
router.post('/', taskItemController.createTaskItem);
router.put('/:id', taskItemController.updateTaskItem);
router.delete('/:id', taskItemController.deleteTaskItem);

module.exports = router;
