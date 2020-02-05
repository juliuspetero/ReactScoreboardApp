import {
  ADD_UNAUTHORIZED_USER_FLASH_MESSAGE,
  DELETE_UNAUTHORIZED_USER_FLASH_MESSAGE
} from '../actionTypes/unauthorizedUserFlashMessagesActionTypes';

export const addUnauthorizedUserFlashMessage = message => {
  return dispatch => {
    dispatch({ type: ADD_UNAUTHORIZED_USER_FLASH_MESSAGE, message });
  };
};

export const deleteUnauthorizedUserFlashMessage = () => {
  return dispatch => {
    dispatch({ type: DELETE_UNAUTHORIZED_USER_FLASH_MESSAGE });
  };
};
