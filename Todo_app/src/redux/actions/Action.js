import {
  ADD_TASK,
  DELETE_TASK,
  GENERATE_NEW_ID,
  TOGGLE_COMPLETE,
  DELETE_ALL_DONE_TASKS,
} from "../types/types";

export const addNewTask = (newTask) => (dispatch) => {
  dispatch({ type: ADD_TASK, payload: newTask });
  dispatch({ type: GENERATE_NEW_ID });
};

export const toggleComplete = (id, allTasks) => (dispatch) => {
  let newAllTasks = [...allTasks];
  let index = newAllTasks.findIndex((task) => task.id === id);
  newAllTasks[index].complete = !newAllTasks[index].complete;
  dispatch({ type: TOGGLE_COMPLETE, payload: newAllTasks });
};

export const deleteTheTask = (id, allTasks) => (dispatch) => {
  let newAllTasks = allTasks.filter((task) => task.id !== id);
  dispatch({ type: DELETE_TASK, payload: newAllTasks });
};

export const deleteAllDoneTasks = (allTasks) => (dispatch) => {
  let newAllTasks = allTasks.filter((task) => task.complete !== true);
  dispatch({ type: DELETE_ALL_DONE_TASKS, payload: newAllTasks });
};
