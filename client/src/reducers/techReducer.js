import {
  ADD_TECH,
  DELETE_TECH,
  GET_TECHS,
  SET_LOADING,
  TECHS_ERROR,
} from "../actions/types";

const initialState = {
  techs: [],
  loading: false,
  error: null,
};

// reducer for our technician feature
const techReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false,
      };

    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false,
      };

    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter((tech) => tech._id != action.payload),
      };

    case TECHS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default techReducer;
