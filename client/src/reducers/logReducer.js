import {
  GET_LOGS,
  LOGS_ERROR,
  SET_LOADING,
  ADD_LOG,
  SET_CURRENT,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  ADD_TECH
} from "../actions/types";

const initialState = {
  logs: [],
  current: null,
  loader: false,
  error: null,
};

// reducer for our logs feature
// reducer is responsible for changing the state of our application by returning a new state object
// we donot modify the existing state
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loader: false,
      };

    case ADD_TECH:
      return {
        ...state,
        loader:false
      }

    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loader: false,
      };

    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log._id != action.payload),
        loader: false,
      };

    case UPDATE_LOG:
      return {
        ...state,
        loader: false,
        logs: state.logs.map((log) => {
          if (log.id == action.payload.id) return action.payload;
          return log;
        }),
      };

    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload,
        loader: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loader: true,
      };

    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
