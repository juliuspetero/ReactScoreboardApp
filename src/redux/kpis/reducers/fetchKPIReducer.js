import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from '../actionsTypes/fetchUserActionTypes';

const initialState = {
  loading: false,
  user: null,
  error: null
};

const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: null
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchUserReducer;
