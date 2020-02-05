import isEmpty from 'lodash/isEmpty';
import {
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE
} from '../actionsTypes/authenticateUserTypes';

import { DELETE_AUTHENTICATE_USER_ERROR_MESSAGE } from '../../errorMessages/actionTypes/errorMessagesActionType';
import { LOG_OUT } from '../actionsTypes/logoutTypes';
const initialState = {
  isLoading: false,
  authenticateUser: null,
  isAuthenticated: false,
  errors: null
};

const authenticateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATE_USER_SUCCESS:
      return {
        isLoading: false,
        authenticateUser: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        errors: null
      };
    case AUTHENTICATE_USER_FAILURE:
      return {
        isLoading: false,
        authenticateUser: null,
        isAuthenticated: false,
        errors: action.payload
      };

    case DELETE_AUTHENTICATE_USER_ERROR_MESSAGE:
      delete state.errors.data[action.key];
      return {
        ...state
      };

    case LOG_OUT:
      return {
        isLoading: false,
        authenticateUser: null,
        isAuthenticated: false,
        errors: null
      };

    default:
      return state;
  }
};

export default authenticateUserReducer;
