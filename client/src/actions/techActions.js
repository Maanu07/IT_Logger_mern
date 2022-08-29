import {
  ADD_TECH,
  TECHS_ERROR,
  GET_TECHS,
  SET_LOADING,
  DELETE_TECH,
} from "./types";


const BASE_URL = 'http://localhost:5000'

// add technician to the server
// it is a async action creator which returns a function instead of an action object, this is due to the middleware called thunk
export const addTech = (tech) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader());
      const res = await fetch(`${BASE_URL}/tech/add`, {
        method: "POST",
        body: JSON.stringify(tech),
        headers: {
          "CONTENT-TYPE": "application/json",
        },
      });
      const data = await res.json();
      dispatch({
        type: ADD_TECH,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.message,
      });
    }
  };
};

// get the technicians from the server
export const getTechs = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoader());
      // server pe request jayegi to get techs
      const res = await fetch(`${BASE_URL}/techs`);
      const data = await res.json();
      dispatch({
        type: GET_TECHS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.message,
      });
    }
  };
};

// delete the technician from the server
export const deleteTech = (_id) => async (dispatch) => {
  try {
    await fetch(`${BASE_URL}/tech/delete/${_id}`, {
      method: "DELETE",
    });
    dispatch({
      type: DELETE_TECH,
      payload: _id,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.message,
    });
  }
};

// set loader to true
const setLoader = () => {
  return {
    type: SET_LOADING,
  };
};
