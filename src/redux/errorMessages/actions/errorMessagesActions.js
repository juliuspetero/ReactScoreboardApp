import {
  DELETE_AUTHENTICATE_USER_ERROR_MESSAGE,
  DELETE_CREATE_USER_ERROR_MESSAGE,
  DELETE_CREATE_KPI_ERROR_MESSAGE
} from '../actionTypes/errorMessagesActionType';

export const deleteCreateUserErrorMessage = key => {
  return {
    type: DELETE_CREATE_USER_ERROR_MESSAGE,
    key
  };
};

export const deleteAuthenticateUserErrorMessage = key => {
  return {
    type: DELETE_AUTHENTICATE_USER_ERROR_MESSAGE,
    key
  };
};

export const deleteCreateKPIErrorMessage = key => {
  return {
    type: DELETE_CREATE_KPI_ERROR_MESSAGE,
    key
  };
};
