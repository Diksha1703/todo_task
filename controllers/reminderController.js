const { sendReminder } = require('../utils/emailService');
const Todo = require('../models/Todo'); 

exports.sendReminderController = async (req, res) => {
  try {
    const { email, todoId } = req.body;

    if (!email || !todoId) {
      return res.status(400).json({ error: 'Email and Todo ID are required' });
    }

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }


    const subject = `Reminder for Todo: ${todo.title}`;
    const text = `Hello,\nHere is your reminder for the Todo task:\n\nTitle: ${todo.title}\nDescription: ${todo.description}\nDue Date: ${todo.dueDate}\n\nThank you.`;


    await sendReminder(email, subject, text);

    return res.status(200).json({ message: 'Reminder email sent successfully' });
  } catch (error) {
    console.error('Error sending reminder email:', error);
    return res.status(500).json({ error: 'Failed to send reminder', details: error });
  }
};
