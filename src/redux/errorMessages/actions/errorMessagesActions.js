import {
  DELETE_AUTHENTICATE_USER_ERROR_MESSAGE,
  DELETE_CREATE_USER_ERROR_MESSAGE,
  DELETE_CREATE_KPI_ERROR_MESSAGE,
  DELETE_CREATE_SCOREBOARD_ERROR_MESSAGE,
  DELETE_EDIT_SCOREBOARD_ERROR_MESSAGE,
  DELETE_EDIT_SCORES_ERROR_MESSAGE,
  DELETE_EDIT_EMPLOYEE_ERROR_MESSAGE,
  DELETE_CREATE_REPORT_ERROR_MESSAGE,
  DELETE_EDIT_REPORT_ERROR_MESSAGE
} from '../actionTypes/errorMessagesActionType';

export const deleteCreateUserErrorMessage = key => {
  return {
    type: DELETE_CREATE_USER_ERROR_MESSAGE,
    key
  };
};

export const deleteEditEmployeeErrorMessage = key => {
  return {
    type: DELETE_EDIT_EMPLOYEE_ERROR_MESSAGE,
    key
  };
};

export const deleteEditReportErrorMessage = key => {
  return {
    type: DELETE_EDIT_REPORT_ERROR_MESSAGE,
    key
  };
};

export const deleteCreateReportErrorMessage = key => {
  return {
    type: DELETE_CREATE_REPORT_ERROR_MESSAGE,
    key
  };
};

export const deleteCreateScoreboardErrorMessage = key => {
  return {
    type: DELETE_CREATE_SCOREBOARD_ERROR_MESSAGE,
    key
  };
};

export const deleteEditScoreboardErrorMessage = key => {
  return {
    type: DELETE_EDIT_SCOREBOARD_ERROR_MESSAGE,
    key
  };
};

export const deleteEditScoresErrorMessage = key => {
  return {
    type: DELETE_EDIT_SCORES_ERROR_MESSAGE,
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
