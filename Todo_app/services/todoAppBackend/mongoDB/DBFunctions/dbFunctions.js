const TaskModel = require("../../mongoDB/TaskSchema.js");

const getAllTasks = async () => {
  let tasks = await TaskModel.find({});
  return tasks;
};

const updateTaskName = async (id, newTaskName) => {
  const oldTask = await TaskModel.findOne({ _id: id });
  oldTask.name = newTaskName;
  await oldTask.save();
};

const updateTaskComplete = async (id, taskCompleteChanged) => {
  const oldTask = await TaskModel.findOne({ _id: id });
  oldTask.complete = taskCompleteChanged;
  await oldTask.save();
};

const addNewTaskToDB = async (dataOfTask) => {
  const task = new TaskModel({
    name: dataOfTask.name,
    complete: dataOfTask.complete,
  });
  await task.save();
  return task;
};

const deleteByID = async (id) => {
  await TaskModel.findByIdAndRemove(id);
};

module.exports = {
  getAllTasks,
  updateTaskName,
  updateTaskComplete,
  addNewTaskToDB,
  deleteByID,
};
