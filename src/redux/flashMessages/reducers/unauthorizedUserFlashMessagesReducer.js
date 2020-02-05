import {
  ADD_UNAUTHORIZED_USER_FLASH_MESSAGE,
  DELETE_UNAUTHORIZED_USER_FLASH_MESSAGE
} from '../actionTypes/unauthorizedUserFlashMessagesActionTypes';

const initialState = null;

const unauthorizedUserflashMessagesReducer = (
  state = initialState,
  action = {}
) => {
  switch (action.type) {
    case ADD_UNAUTHORIZED_USER_FLASH_MESSAGE:
      return action.message;

    case DELETE_UNAUTHORIZED_USER_FLASH_MESSAGE:
      return initialState;
    default:
      return initialState;
  }
};

export default unauthorizedUserflashMessagesReducer;
