const { Op } = require('sequelize');
const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const userId = req.userId;
  try {
    const todo = await Todo.create({ title, description, dueDate, userId });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create Todo', details: err });
  }
};

exports.getTodosByDate = async (req, res) => {
  const { date } = req.query;
  const userId = req.userId;
  try {
    const todos = await Todo.findAll({ where: { userId, dueDate: date } });
    res.json(todos);
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch Todos', details: err });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const todo = await Todo.findOne({ where: { id, userId: req.userId } });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const createdAt = new Date(todo.createdAt);
    createdAt.setHours(0, 0, 0, 0); 

    if (createdAt.getTime() !== today.getTime()) {
      return res.status(403).json({ message: 'Only tasks created today can be updated' });
    }

    await Todo.update(updates, { where: { id, userId: req.userId } });
    return res.json({ message: 'Todo updated' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update Todo', details: err });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ where: { id, userId: req.userId } });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const createdAt = new Date(todo.createdAt);
    createdAt.setHours(0, 0, 0, 0); 

    if (createdAt.getTime() !== today.getTime()) {
      return res.status(403).json({ message: 'Only tasks created today can be deleted' });
    }

    await Todo.destroy({ where: { id, userId: req.userId } });
    return res.json({ message: 'Todo deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete Todo', details: err });
  }
};

exports.updateTodoStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const { isCompleted } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid or missing Todo ID' });
    }

    if (typeof isCompleted !== 'boolean') {
      return res.status(400).json({ error: 'Invalid or missing isCompleted value' });
    }

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.completed = isCompleted;
    await todo.save();

    return res.status(200).json({ message: 'Todo status updated successfully', todo });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update Todo', details: error });
  }
};

