import * as Types from "../types/types";

const initialState = {
  ID: 0,
  doShowALL: true,
  doSortAZ: false,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_SHOW:
      return {
        ...state,
        doShowALL: action.payload,
      };
    case Types.SORT_AZ:
      return {
        ...state,
        doSortAZ: action.payload,
      };
    default:
      return state;
  }
};

export default TaskReducer;
