const TaskModel = require("../../mongoDB/TaskSchema.js");

const getAllTasks = async () => {
  let tasks = await TaskModel.find({});
  return tasks;
};

const updateTaskName = async () => {
  let tasks = await TaskModel.find({});
  return tasks;
};

module.exports = { getAllTasks };
