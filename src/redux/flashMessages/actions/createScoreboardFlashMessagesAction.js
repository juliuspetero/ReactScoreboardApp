import {
  ADD_CREATE_SCOREBOARD_FLASH_MESSAGE,
  DELETE_CREATE_SCOREBOARD_FLASH_MESSAGE
} from '../actionTypes/createScoreboardFlashMessageActionTypes';

export const addCreateScoreboardFlashMessage = message => {
  return dispatch => {
    dispatch({ type: ADD_CREATE_SCOREBOARD_FLASH_MESSAGE, message });
  };
};

export const deleteCreateScoreboardFlashMessage = () => {
  return dispatch => {
    dispatch({ type: DELETE_CREATE_SCOREBOARD_FLASH_MESSAGE });
  };
};
