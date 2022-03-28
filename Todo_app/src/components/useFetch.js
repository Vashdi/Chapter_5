import axios from "axios";
import { useState, useEffect } from "react";
import configService from "./config.js";

export default function useFetch() {
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    const res = await axios.get(configService.todo_api);
    let dbAllTasks = res.data;
    setTasks(dbAllTasks);
  }, []);

  const getAllTasks = async () => {
    const res = await axios.get(configService.todo_api);
    let dbAllTasks = res.data;
    setTasks(dbAllTasks);
    return dbAllTasks;
  };

  const changeTasksToShow = async () => {
    let dbAllTasks = await getAllTasks();
    setTasks(dbAllTasks);
  };

  const hideAllDoneTasks = async () => {
    let dbAllTasks = await getAllTasks();
    dbAllTasks = tasks.filter((task) => task.complete !== true);
    setTasks(dbAllTasks);
  };

  return [tasks, getAllTasks, changeTasksToShow, hideAllDoneTasks];
}
