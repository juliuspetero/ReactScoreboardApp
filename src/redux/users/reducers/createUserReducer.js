import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE
} from '../actionsTypes/createUserActionTypes';

import { DELETE_CREATE_USER_ERROR_MESSAGE } from '../../errorMessages/actionTypes/errorMessagesActionType';
const initialState = {
  isLoading: false,
  createdUser: null,
  errors: null
};

const createUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_USER_SUCCESS:
      return {
        isLoading: false,
        createdUser: action.payload,
        errors: null
      };
    case CREATE_USER_FAILURE:
      return {
        isLoading: false,
        createdUser: null,
        errors: action.payload
      };

    case DELETE_CREATE_USER_ERROR_MESSAGE:
      delete state.errors.data[action.key];
      return {
        ...state
      };

    default:
      return state;
  }
};

export default createUserReducer;
