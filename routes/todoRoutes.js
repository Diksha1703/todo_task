const express = require('express');
const { createTodo, getTodosByDate, updateTodo, deleteTodo, updateTodoStatus,  } = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');
const { sendReminderController } = require('../controllers/reminderController');

const router = express.Router();
console.log('inside routes')
router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getTodosByDate);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);
router.put('/status/:id', authMiddleware, updateTodoStatus);
router.post('/send-reminder', authMiddleware, sendReminderController);


module.exports = router;
