import {
  ADD_CREATE_KPI_FLASH_MESSAGE,
  DELETE_CREATE_KPI_FLASH_MESSAGE
} from '../actionTypes/createKPIFlashMessagesActionTypes';

export const addCreateKPIFlashMessage = message => {
  return dispatch => {
    dispatch({ type: ADD_CREATE_KPI_FLASH_MESSAGE, message });
  };
};

export const deleteCreateKPIFlashMessage = id => {
  return dispatch => {
    dispatch({ type: DELETE_CREATE_KPI_FLASH_MESSAGE, id });
  };
};
