import axios from "axios";
import { SORT_AZ, TOGGLE_SHOW } from "../types/types";
import configService from "../../components/config.js";
import update from "immutability-helper";

export const toggleShow = (doShowAll) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_SHOW, payload: doShowAll });
  };
};

export const toggleSortAZ = (doSortAZ) => {
  return async (dispatch) => {
    dispatch({ type: SORT_AZ, payload: !doSortAZ });
  };
};

export const hideOrShowAlldoneTasksAction = (doShowALL) => {
  return async (dispatch) => {
    dispatch(toggleShow(!doShowALL));
  };
};

const handleAdd = async (newTasksToShow, newTask) => {
  await axios.post(configService.addTask_api, { task: newTask });
  return newTasksToShow;
};

const handleDeleteAllDoneTasks = async (newerAllTasks) => {
  await axios.delete(configService.todo_api + "api/tasks");
  return newerAllTasks;
};

export const addNewTask = (newTask, tasksToShow, mutate) => {
  return async () => {
    const newTasksToShow = update(tasksToShow, { $push: [newTask] });

    const options = {
      optimisticData: newTasksToShow,
      rollbackOnError: true,
    };

    mutate(handleAdd(newTasksToShow, newTask), options);
  };
};

export const deleteAllDoneTasks = (allTasks, mutate) => {
  return async () => {
    let newerAllTasks = allTasks.filter((task) => task.complete !== true);

    const options = {
      optimisticData: newerAllTasks,
      rollbackOnError: true,
    };

    mutate(handleDeleteAllDoneTasks(newerAllTasks), options);
  };
};
