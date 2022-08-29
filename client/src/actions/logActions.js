import {
  GET_LOGS,
  LOGS_ERROR,
  SET_LOADING,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
} from "./types";

const BASE_URL = 'http://localhost:5000'

// get the log items from the server
export function getLogs() {
  return async (dispatch) => {
    try {
      dispatch(setLoader());
      // requesting the database
      const res = await fetch(`${BASE_URL}/logs`);
      const data = await res.json();
      dispatch({
        type: GET_LOGS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.message,
      });
    }
  };
}

// async action creator (uses thunk middleware)
// adds a new log to the server
export function addLog(log) {
  return async (dispatch) => {
    try {
      dispatch(setLoader());
      // adding a new log to the server
      const res = await fetch(BASE_URL + "/log/add", {
        method: "POST",
        body: JSON.stringify(log),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({
        type: ADD_LOG,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.message,
      });
    }
  };
}

// deleted the selected log from the server
export function deleteLog(_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoader());
      await fetch(`${BASE_URL}/log/delete/${_id}`, {
        method: "DELETE",
      });
      dispatch({
        type: DELETE_LOG,
        payload: _id,
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.message,
      });
    }
  };
}

// update the selected log from the server
export const updateLog = (log) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader());
      // updating the date as we update our log
      log.date = new Date()
      await fetch(`${BASE_URL}/log/update/${log._id}`, {
        method: "PUT",
        body: JSON.stringify(log),
        headers: {
          "CONTENT-TYPE": "application/json",
        },
      });
      dispatch({
        type: UPDATE_LOG,
        payload: log,
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.messages,
      });
    }
  };
};

// search for a particular log
export function searchLogs(text) {
  return async (dispatch) => {
    try {
      dispatch(setLoader());
      let res;
      // if text = "" in search box then return all the logs
      if(text==""){
        res = await fetch(`${BASE_URL}/logs`)
      }else{
         res = await fetch(`${BASE_URL}/log/search/${text}`);
      }
      const data = await res.json();
      dispatch({
        type: SEARCH_LOGS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.message,
      });
    }
  };
}

// sets the current selected log
export function setCurrent(log) {
  return {
    type: SET_CURRENT,
    payload: log,
  };
}

// sets loading to true
function setLoader() {
  return {
    type: SET_LOADING,
  };
}

// action creator returns action object
