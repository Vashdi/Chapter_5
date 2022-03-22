const express = require("express");
const { getAllTasks } = require("../mongoDB/DBFunctions/dbFunctions");
var taskRouter = express.Router();
const TaskModel = require("../mongoDB/TaskSchema");

taskRouter.get("/", async (req, res) => {
  let tasks = await getAllTasks();
  res.json(tasks);
});

taskRouter.put("/updateName/:id", async (req, res) => {
  const body = req.body;
  const oldTask = await TaskModel.findOne({ _id: req.params.id });
  oldTask.name = body.name;
  await oldTask.save();
  res.sendStatus(200);
});

taskRouter.put("/updateComplete/:id", async (req, res) => {
  const body = req.body;
  const oldTask = await TaskModel.findOne({ _id: req.params.id });
  oldTask.complete = body.complete;
  await oldTask.save();
  res.sendStatus(200);
});

taskRouter.post("/tasks", (req, res) => {
  const data = req.body.task;
  const task = new TaskModel({
    name: data.name,
    complete: data.complete,
  });

  task.save().then((result) => {
    console.log("task saved!");
  });
  res.send(task);
});

taskRouter.delete("/:id", (req, res) => {
  TaskModel.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => console.log(error));
});

module.exports = taskRouter;
