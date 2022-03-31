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

export const hideAllDoneTasksAction = () => {
  return async (dispatch) => {
    dispatch(toggleShow(false));
  };
};

export const showAll = () => {
  return async (dispatch) => {
    dispatch(toggleShow(true));
  };
};

const handleAdd = async (newTasksToShow, newTask) => {
  await axios.post(configService.addTask_api, { task: newTask });
  return newTasksToShow;
};

const handleDeleteAllDoneTasks = async (allTasks, newTasksToShow) => {
  for (const task of allTasks) {
    if (task.complete) {
      try {
        await axios.delete(configService.todo_api + task.id);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return newTasksToShow;
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

    mutate(handleDeleteAllDoneTasks(allTasks, newerAllTasks), options);
  };
};
