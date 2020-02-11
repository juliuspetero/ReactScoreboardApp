import {
  FETCH_KPIS_REQUEST,
  FETCH_KPIS_SUCCESS,
  FETCH_KPIS_FAILURE
} from '../actionsTypes/fetchKPIsActionTypes';

const initialState = {
  isLoading: false,
  kpis: [],
  error: null
};

const fetchKPIsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KPIS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_KPIS_SUCCESS:
      return {
        isLoading: false,
        kpis: action.payload,
        error: ''
      };
    case FETCH_KPIS_FAILURE:
      return {
        isLoading: false,
        kpis: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchKPIsReducer;
