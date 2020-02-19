import {
  CREATE_SCOREBOARD_REQUEST,
  CREATE_SCOREBOARD_SUCCESS,
  CREATE_SCOREBOARD_FAILURE
} from '../actionsTypes/createScoreboardActionTypes';

import { DELETE_CREATE_SCOREBOARD_ERROR_MESSAGE } from '../../errorMessages/actionTypes/errorMessagesActionType';
const initialState = {
  isLoading: false,
  createScoreboard: null,
  errors: null
};

const createScoreboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SCOREBOARD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_SCOREBOARD_SUCCESS:
      return {
        isLoading: false,
        createScoreboard: action.payload,
        errors: null
      };
    case CREATE_SCOREBOARD_FAILURE:
      return {
        isLoading: false,
        createScoreboard: null,
        errors: action.payload
      };

    case DELETE_CREATE_SCOREBOARD_ERROR_MESSAGE:
      delete state.errors.data[action.key];
      return {
        ...state
      };

    default:
      return state;
  }
};

export default createScoreboardReducer;
