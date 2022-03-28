import * as Types from "../types/types";

const initialState = {
  ID: 0,
  allTasks: [],
  doShowALL: true,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
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
