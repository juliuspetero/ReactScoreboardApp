import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE
} from '../actionsTypes/editUserActionTypes';

const initialState = {
  loading: false,
  editedUser: null,
  error: null
};

const createUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case EDIT_USER_SUCCESS:
      return {
        loading: false,
        editedUser: action.payload,
        error: ''
      };
    case EDIT_USER_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default createUserReducer;
