const express = require('express');
const Task = require('../models/task.model');

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

const router = express.Router();

router.get('/', getTasks);

router.post('/', createTask);

router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);

module.exports = router;
