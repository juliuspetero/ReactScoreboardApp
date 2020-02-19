import {
  ADD_CREATE_SCOREBOARD_FLASH_MESSAGE,
  DELETE_CREATE_SCOREBOARD_FLASH_MESSAGE
} from '../actionTypes/createScoreboardFlashMessageActionTypes';

const initialState = null;

const createScoreboardFlashMessagesReducer = (
  state = initialState,
  action = {}
) => {
  switch (action.type) {
    case ADD_CREATE_SCOREBOARD_FLASH_MESSAGE:
      return action.message;

    case DELETE_CREATE_SCOREBOARD_FLASH_MESSAGE:
      return null;
    default:
      return state;
  }
};

export default createScoreboardFlashMessagesReducer;
