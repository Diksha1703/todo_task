require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const sequelize = require('./utils/db');


const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

sequelize.sync()
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch(err => console.error('Failed to sync database', err));
