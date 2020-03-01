import {
  FETCH_KPIS_REQUEST,
  FETCH_KPIS_SUCCESS,
  FETCH_KPIS_FAILURE
} from '../actionsTypes/fetchKPIsActionTypes';

const initialState = {
  isLoading: false,
  jobtitle: null,
  error: null
};

const fetchJobtitleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KPIS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_KPIS_SUCCESS:
      return {
        isLoading: false,
        jobtitle: action.payload,
        error: ''
      };
    case FETCH_KPIS_FAILURE:
      return {
        isLoading: false,
        jobtitle: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchJobtitleReducer;
