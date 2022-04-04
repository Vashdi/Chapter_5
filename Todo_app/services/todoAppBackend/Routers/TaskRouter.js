const express = require("express");
const {
  getAllTasks,
  updateTaskName,
  updateTaskComplete,
  addNewTaskToDB,
  deleteByID,
  handleDeleteDoneTasks,
} = require("../mongoDB/DBFunctions/dbFunctions");
const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  const doShowAll = req.query.doShowAll === "true";
  const doSortAZ = req.query.doSortAZ === "true";
  let tasks = await getAllTasks();
  if (!doShowAll) {
    tasks = tasks.filter((task) => task.complete !== true);
  }
  if (doSortAZ) {
    tasks.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }
  res.json(tasks);
});

taskRouter.put("/updateName/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const newTaskName = body.name;
  let data = await updateTaskName(id, newTaskName);
  res.send(data);
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
  await addNewTaskToDB(dataOfTask);
  res.sendStatus(200);
});

taskRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await deleteByID(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
});

taskRouter.delete("/api/tasks", async (req, res) => {
  handleDeleteDoneTasks();
});

module.exports = taskRouter;
