import {
  FETCH_KPIS_REQUEST,
  FETCH_KPIS_SUCCESS,
  FETCH_KPIS_FAILURE
} from '../actionsTypes/fetchKPIsActionTypes';

const initialState = {
  isLoading: false,
  jobtitles: [],
  error: null
};

const fetchJobtitlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KPIS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_KPIS_SUCCESS:
      return {
        isLoading: false,
        jobtitles: action.payload,
        error: ''
      };
    case FETCH_KPIS_FAILURE:
      return {
        isLoading: false,
        jobtitles: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchJobtitlesReducer;
