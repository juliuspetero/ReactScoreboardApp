import {
  ADD_CREATE_USER_FLASH_MESSAGE,
  DELETE_CREATE_USER_FLASH_MESSAGE
} from '../actionTypes/createUserflashMessagesActionTypes';

export const addCreateUserFlashMessage = message => {
  return dispatch => {
    dispatch({ type: ADD_CREATE_USER_FLASH_MESSAGE, message });
  };
};

export const deleteCreateUserFlashMessage = id => {
  return dispatch => {
    dispatch({ type: DELETE_CREATE_USER_FLASH_MESSAGE, id });
  };
};
