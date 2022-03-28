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
  return async () => {
    let res = await axios.post(configService.addTask_api, {
      task: newTask,
    });
    await getAllTasks();
  };
};

export const toggleComplete = (id, complete) => async () => {
  try {
    await axios.put(configService.update_complete_api + id, {
      complete: !complete,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTheTask = (id, getAllTasks) => async () => {
  await axios.delete(configService.todo_api + id);
  await getAllTasks();
};

export const deleteAllDoneTasks = (getAllTasks) => {
  return async () => {
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
