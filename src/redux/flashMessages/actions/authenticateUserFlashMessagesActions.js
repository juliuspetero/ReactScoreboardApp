import {
  ADD_AUTHENTICATE_USER_FLASH_MESSAGE,
  DELETE_AUTHENTICATE_USER_FLASH_MESSAGE
} from '../actionTypes/authenticateUserFlashMessagesActionTypes';

export const addAuthenticateUserFlashMessage = message => {
  return dispatch => {
    dispatch({ type: ADD_AUTHENTICATE_USER_FLASH_MESSAGE, message });
  };
};

export const deleteAuthenticateUserFlashMessage = () => {
  return dispatch => {
    dispatch({ type: DELETE_AUTHENTICATE_USER_FLASH_MESSAGE });
  };
};
