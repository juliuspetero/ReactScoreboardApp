import {
  ADD_AUTHENTICATE_USER_FLASH_MESSAGE,
  DELETE_AUTHENTICATE_USER_FLASH_MESSAGE
} from '../actionTypes/authenticateUserFlashMessagesActionTypes';

const initialState = null;

const authenticateUserflashMessagesReducer = (
  state = initialState,
  action = {}
) => {
  switch (action.type) {
    case ADD_AUTHENTICATE_USER_FLASH_MESSAGE:
      return action.message;

    case DELETE_AUTHENTICATE_USER_FLASH_MESSAGE:
      return initialState;
    default:
      return initialState;
  }
};

export default authenticateUserflashMessagesReducer;
