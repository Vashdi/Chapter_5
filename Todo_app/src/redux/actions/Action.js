import axios from "axios";
import { SET_TASK_NAME, TOGGLE_SHOW } from "../types/types";
import configService from "../../components/config.js";

export const toggleShow = (doShowAll) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_SHOW, payload: doShowAll });
  };
};

export const hideAllDoneTasksAction = (hideAllDoneTasks) => {
  return async (dispatch) => {
    hideAllDoneTasks();
    dispatch(toggleShow(false));
  };
};

export const showAll = (getAllTasks) => {
  return async (dispatch) => {
    getAllTasks();
    dispatch(toggleShow(true));
  };
};

export const addNewTask = (newTask, getAllTasks) => {
  return async (dispatch) => {
    let res = await axios.post(configService.addTask_api, {
      task: newTask,
    });
    await getAllTasks();
  };
};

export const toggleComplete = (id, complete) => async (dispatch) => {
  try {
    await axios.put(configService.update_complete_api + id, {
      complete: !complete,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTheTask = (id, getAllTasks) => async (dispatch) => {
  await axios.delete(configService.todo_api + id);
  await getAllTasks();
};

export const actionSetTaskName =
  (allTasks, id, newTaskName) => async (dispatch) => {
    let changeNewTasks = [...allTasks];
    let index = changeNewTasks.findIndex((oldTask) => oldTask.id === id);
    changeNewTasks[index].name = newTaskName;
    dispatch({ type: SET_TASK_NAME, payload: changeNewTasks });
  };

export const deleteAllDoneTasks = (getAllTasks) => {
  return async (dispatch) => {
    const allTasks = await getAllTasks();
    for (const task of allTasks) {
      if (task.complete) {
        try {
          await axios.delete(configService.todo_api + task.id);
        } catch (error) {
          console.log(error);
        }
      }
    }
    await getAllTasks();
  };
};
