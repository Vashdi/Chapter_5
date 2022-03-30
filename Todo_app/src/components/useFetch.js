import axios from "axios";
import { useState, useEffect } from "react";
import configService from "./config.js";

export default function useFetch(showAll) {
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    const optionAxios = `doShowAll=${showAll}`;
    const res = await axios.get(configService.todo_api + `?${optionAxios}`);
    let dbAllTasks = res.data;
    setTasks(dbAllTasks);
  }, [showAll]);

  return [tasks, setTasks];
}
