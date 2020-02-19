import {
  ADD_EDIT_SCOREBOARD_FLASH_MESSAGE,
  DELETE_EDIT_SCOREBOARD_FLASH_MESSAGE
} from '../actionTypes/editScoreboardFlashMessageActionTypes';

const initialState = null;

const editScoreboardFlashMessagesReducer = (
  state = initialState,
  action = {}
) => {
  switch (action.type) {
    case ADD_EDIT_SCOREBOARD_FLASH_MESSAGE:
      return action.message;

    case DELETE_EDIT_SCOREBOARD_FLASH_MESSAGE:
      return null;
    default:
      return state;
  }
};

export default editScoreboardFlashMessagesReducer;
