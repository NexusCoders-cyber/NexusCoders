const logger = require('../logger');
const fs = require('fs');
const todoStorageFile = __dirname + '/todos.json';

module.exports = {
  name: 'todo',
  description: 'Manage to-do list',
  async execute(client, message, args) {
    try {
      const action = args[0];
      const task = args.slice(1).join(' ');

      switch (action) {
        case 'add':
          await addTodo(task, message.from);
          break;
        case 'list':
          await listTodos(message.from);
          break;
        case 'done':
          await completeTodo(task, message.from);
          break;
        case 'delete':
          await deleteTodo(task, message.from);
          break;
        default:
          await message.reply('Invalid todo action');
      }

      logger.info(`Todo command executed by ${message.from}`);
    } catch (error) {
      await message.reply('Error managing todo');
      logger.error(`Error in todo command by ${message.from}: ${error}`);
      throw error;
    }
  },
};

async function addTodo(task, userId) {
  const todos = JSON.parse(fs.readFileSync(todoStorageFile, 'utf8')) || {};
  if (!todos[userId]) todos[userId] = [];
  todos[userId].push({ task, completed: false });
  fs.writeFileSync(todoStorageFile, JSON.stringify(todos));
  await message.reply(`Added todo: ${task}`);
}

async function listTodos(userId) {
  const todos = JSON.parse(fs.readFileSync(todoStorageFile, 'utf8')) || {};
  const todoList = todos[userId] ? todos[userId].map((todo, index) => `${index + 1}. ${todo.task} [${todo.completed ? 'Done' : 'Pending'}]`).join('\n') : 'No todos found';
  await message.reply(`Your todos: \n${todoList}`);
}

async function completeTodo(task, userId) {
  const todos = JSON.parse(fs.readFileSync(todoStorageFile, 'utf8')) || {};
  if (todos[userId]) {
    const todoIndex = todos[userId].findIndex((todo) => todo.task === task);
    if (todoIndex !== -1) {
      todos[userId][todoIndex].completed = true;
      fs.writeFileSync(todoStorageFile, JSON.stringify(todos));
      await message.reply(`Completed todo: ${task}`);
    } else {
      await message.reply(`Todo not found: ${task}`);
    }
  } else {
    await message.reply('No todos found');
  }
}

async function deleteTodo(task, userId) {
  const todos = JSON.parse(fs.readFileSync(todoStorageFile, 'utf8')) || {};
  if (todos[userId]) {
    const todoIndex = todos[userId].findIndex((todo) => todo.task === task);
    if (todoIndex !== -1) {
      todos[userId].splice(todoIndex, 1);
      fs.writeFileSync(todoStorageFile, JSON.stringify(todos));
      await message.reply(`Deleted todo: ${task}`);
    } else {
      await message.reply(`Todo not found: ${task}`);
    }
  } else {
    await message.reply('No todos found');
  }
}