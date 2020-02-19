import {
  EDIT_SCOREBOARD_REQUEST,
  EDIT_SCOREBOARD_SUCCESS,
  EDIT_SCOREBOARD_FAILURE
} from '../actionsTypes/editScoreboardActionTypes';

import { DELETE_EDIT_SCOREBOARD_ERROR_MESSAGE } from '../../errorMessages/actionTypes/errorMessagesActionType';
const initialState = {
  isLoading: false,
  editScoreboard: null,
  errors: null
};

const editScoreboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_SCOREBOARD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_SCOREBOARD_SUCCESS:
      return {
        isLoading: false,
        editScoreboard: action.payload,
        errors: null
      };
    case EDIT_SCOREBOARD_FAILURE:
      return {
        isLoading: false,
        editScoreboard: null,
        errors: action.payload
      };

    case DELETE_EDIT_SCOREBOARD_ERROR_MESSAGE:
      delete state.errors.data[action.key];
      return {
        ...state
      };

    default:
      return state;
  }
};

export default editScoreboardReducer;
