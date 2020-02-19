import {
  ADD_EDIT_SCOREBOARD_FLASH_MESSAGE,
  DELETE_EDIT_SCOREBOARD_FLASH_MESSAGE
} from '../actionTypes/editScoreboardFlashMessageActionTypes';

export const addEditScoreboardFlashMessage = message => {
  return dispatch => {
    dispatch({ type: ADD_EDIT_SCOREBOARD_FLASH_MESSAGE, message });
  };
};

export const deleteEditScoreboardFlashMessage = () => {
  return dispatch => {
    dispatch({ type: DELETE_EDIT_SCOREBOARD_FLASH_MESSAGE });
  };
};
