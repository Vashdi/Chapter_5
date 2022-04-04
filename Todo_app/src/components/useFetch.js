import axios from "axios";
import { useState, useEffect } from "react";
import configService from "./config.js";

export default function useFetch(url, showAll) {
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    //const optionAxios = `doShowAll=${showAll}`;
    //url = configService.todo_api + `?${optionAxios}`
    const res = await axios.get(url);
    const dbAllTasks = res.data;
    setTasks(dbAllTasks);
  }, [showAll]);

  return [tasks, setTasks];
}
