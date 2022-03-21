import * as Types from "../types/types";

const initialState = {
  ID: 0,
  allTasks: [],
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GENERATE_NEW_ID:
      return {
        ...state,
        ID: state.ID + 1,
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
    default:
      return state;
  }
};

export default TaskReducer;
