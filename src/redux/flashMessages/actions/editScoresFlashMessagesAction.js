import {
  ADD_EDIT_SCORES_FLASH_MESSAGE,
  DELETE_EDIT_SCORES_FLASH_MESSAGE
} from '../actionTypes/editScoresFlashMessageActionTypes';

export const addEditScoresFlashMessage = message => {
  return dispatch => {
    dispatch({ type: ADD_EDIT_SCORES_FLASH_MESSAGE, message });
  };
};

export const deleteEditScoresFlashMessage = () => {
  return dispatch => {
    dispatch({ type: DELETE_EDIT_SCORES_FLASH_MESSAGE });
  };
};
