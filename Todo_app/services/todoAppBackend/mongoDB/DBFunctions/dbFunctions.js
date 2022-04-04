const TaskModel = require("../../mongoDB/Schemas/TaskSchema.js");

const getAllTasks = async () => {
  let tasks = await TaskModel.find({});
  return tasks;
};

const updateTaskName = async (id, newTaskName) => {
  const newTask = await TaskModel.findOneAndUpdate(
    { _id: id },
    { name: newTaskName }
  );
  return newTask;
};

const updateTaskComplete = async (id, taskCompleteChanged) => {
  await TaskModel.findOneAndUpdate(
    { _id: id },
    { complete: taskCompleteChanged }
  );
};

const addNewTaskToDB = async (dataOfTask) => {
  const task = new TaskModel({
    name: dataOfTask.name,
    complete: false,
  });
  await task.save();
  return task;
};

const deleteByID = async (id) => {
  await TaskModel.findByIdAndRemove(id);
};

const handleDeleteDoneTasks = async () => {
  await TaskModel.deleteMany({ complete: true });
};

module.exports = {
  getAllTasks,
  updateTaskName,
  updateTaskComplete,
  addNewTaskToDB,
  deleteByID,
  handleDeleteDoneTasks,
};
