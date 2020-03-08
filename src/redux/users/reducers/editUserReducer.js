import {
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER_REQUEST
} from '../actionsTypes/editUserActionTypes';

import { DELETE_EDIT_EMPLOYEE_ERROR_MESSAGE } from '../../errorMessages/actionTypes/errorMessagesActionType';
const initialState = {
  isLoading: false,
  editEmployee: null,
  errors: null
};

const editEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_USER_SUCCESS:
      return {
        isLoading: false,
        editEmployee: action.payload,
        errors: null
      };
    case EDIT_USER_FAILURE:
      return {
        isLoading: false,
        editEmployee: null,
        errors: action.payload
      };

    case DELETE_EDIT_EMPLOYEE_ERROR_MESSAGE:
      delete state.errors.data[action.key];
      return {
        ...state
      };

    default:
      return state;
  }
};

export default editEmployeeReducer;
