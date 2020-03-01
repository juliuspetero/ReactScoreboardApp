import {
  FETCH_SCOREBOARDS_REQUEST,
  FETCH_SCOREBOARDS_SUCCESS,
  FETCH_SCOREBOARDS_FAILURE
} from '../actionsTypes/fetchScoreboardsActionTypes';

const initialState = {
  isLoading: false,
  scoreboards: [],
  error: null
};

const fetchScoreboardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCOREBOARDS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_SCOREBOARDS_SUCCESS:
      return {
        isLoading: false,
        scoreboards: action.payload,
        error: null
      };
    case FETCH_SCOREBOARDS_FAILURE:
      return {
        isLoading: false,
        scoreboards: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchScoreboardsReducer;
