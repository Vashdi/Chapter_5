import * as Types from "../types/types";

const initialState = {
  ID: 0,
  allTasks: [],
  doShowALL: true,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_ALL_TASKS:
      return {
        ...state,
        allTasks: [...action.payload],
      };
    case Types.ADD_TASK:
      return {
        ...state,
        allTasks: [...state.allTasks, action.payload],
      };
    case Types.DELETE_TASK:
      return {
        ...state,
        allTasks: action.payload,
      };
    case Types.TOGGLE_COMPLETE:
      return {
        ...state,
        allTasks: action.payload,
      };
    case Types.DELETE_ALL_DONE_TASKS:
      return {
        ...state,
        allTasks: action.payload,
      };
    case Types.SET_TASK_NAME:
      return {
        ...state,
        allTasks: action.payload,
      };
    case Types.TOGGLE_SHOW:
      return {
        ...state,
        doShowALL: action.payload,
      };
    default:
      return state;
  }
};

export default TaskReducer;
