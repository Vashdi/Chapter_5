const express = require("express");
const {
  getAllTasks,
  updateTaskName,
  updateTaskComplete,
  addNewTaskToDB,
  deleteByID,
} = require("../mongoDB/DBFunctions/dbFunctions");
const taskRouter = express.Router();
const TaskModel = require("../mongoDB/TaskSchema");

taskRouter.get("/", async (req, res) => {
  let tasks = await getAllTasks();
  res.json(tasks);
});

taskRouter.put("/updateName/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const newTaskName = body.name;
  await updateTaskName(id, newTaskName);
  res.sendStatus(200);
});

taskRouter.put("/updateComplete/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const taskCompleteChanged = body.complete;
  await updateTaskComplete(id, taskCompleteChanged);
  res.sendStatus(200);
});

taskRouter.post("/tasks", async (req, res) => {
  const dataOfTask = req.body.task;
  let task = await addNewTaskToDB(dataOfTask);
  res.send(task);
});

taskRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await deleteByID(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
});

module.exports = taskRouter;
