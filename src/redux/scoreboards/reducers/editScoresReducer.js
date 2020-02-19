import {
  EDIT_SCORES_REQUEST,
  EDIT_SCORES_SUCCESS,
  EDIT_SCORES_FAILURE
} from '../actionsTypes/editScoresActionTypes';

import { DELETE_EDIT_SCORES_ERROR_MESSAGE } from '../../errorMessages/actionTypes/errorMessagesActionType';
const initialState = {
  isLoading: false,
  editScores: null,
  errors: null
};

const editScoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_SCORES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_SCORES_SUCCESS:
      return {
        isLoading: false,
        editScores: action.payload,
        errors: null
      };
    case EDIT_SCORES_FAILURE:
      return {
        isLoading: false,
        editScores: null,
        errors: action.payload
      };

    case DELETE_EDIT_SCORES_ERROR_MESSAGE:
      delete state.errors.data[action.key];
      return {
        ...state
      };

    default:
      return state;
  }
};

export default editScoresReducer;
