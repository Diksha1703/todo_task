const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Todo = sequelize.define('Todo', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  dueDate: { type: DataTypes.DATE },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Todo;
