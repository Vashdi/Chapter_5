import axios from "axios";
import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_COMPLETE,
  DELETE_ALL_DONE_TASKS,
  SET_ALL_TASKS,
  SET_TASK_NAME,
  TOGGLE_SHOW,
} from "../types/types";
import configService from "../../components/config.js";

export const setDBAllTasks = (allDBTasks) => {
  return async (dispatch) => {
    dispatch({ type: SET_ALL_TASKS, payload: allDBTasks });
  };
};

export const toggleShow = (doShowAll) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_SHOW, payload: doShowAll });
  };
};

export const hideAllDoneTasks = (allTasks, setNewTasksToShow) => {
  return async (dispatch) => {
    let newTasksToShow = allTasks.filter((task) => task.complete !== true);
    dispatch(toggleShow(false));
    setNewTasksToShow(newTasksToShow);
  };
};

export const showAll = (allTasks, setNewTasksToShow) => {
  return async (dispatch) => {
    dispatch(toggleShow(true));
    setNewTasksToShow(allTasks);
  };
};

export const addNewTask = (newTask) => {
  return async (dispatch) => {
    let res = await axios.post(configService.addTask_api, {
      task: newTask,
    });
    let newDBTask = res.data;
    dispatch({ type: ADD_TASK, payload: newDBTask });
  };
};

export const toggleComplete = (id, allTasks) => async (dispatch) => {
  try {
    let newAllTasks = [...allTasks];
    let index = newAllTasks.findIndex((task) => task.id === id);
    newAllTasks[index].complete = !newAllTasks[index].complete;
    dispatch({ type: TOGGLE_COMPLETE, payload: newAllTasks });
    await axios.put(configService.update_complete_api + id, {
      complete: newAllTasks[index].complete,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTheTask = (id, allTasks) => async (dispatch) => {
  let newAllTasks = allTasks.filter((task) => task.id !== id);
  await axios.delete(configService.todo_api + id);
  dispatch({ type: DELETE_TASK, payload: newAllTasks });
};

export const actionSetTaskName =
  (allTasks, id, newTaskName) => async (dispatch) => {
    console.log(allTasks, id, newTaskName);
    let changeNewTasks = [...allTasks];
    let index = changeNewTasks.findIndex((oldTask) => oldTask.id === id);
    changeNewTasks[index].name = newTaskName;
    dispatch({ type: SET_TASK_NAME, payload: changeNewTasks });
  };

export const deleteAllDoneTasks = (allTasks) => {
  return async (dispatch) => {
    for (const task of allTasks) {
      if (task.complete) {
        try {
          await axios.delete(configService.todo_api + task.id);
        } catch (error) {
          console.log(error);
        }
      }
    }
    let newAllTasks = allTasks.filter((task) => task.complete !== true);
    dispatch({ type: DELETE_ALL_DONE_TASKS, payload: newAllTasks });
  };
};
