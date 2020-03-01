import {
  FETCH_KPIS_REQUEST,
  FETCH_KPIS_SUCCESS,
  FETCH_KPIS_FAILURE
} from '../actionsTypes/fetchKPIsActionTypes';

const initialState = {
  isLoading: false,
  kpi: null,
  error: null
};

const fetchKPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KPIS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_KPIS_SUCCESS:
      return {
        isLoading: false,
        kpi: action.payload,
        error: ''
      };
    case FETCH_KPIS_FAILURE:
      return {
        isLoading: false,
        kpi: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchKPIReducer;
