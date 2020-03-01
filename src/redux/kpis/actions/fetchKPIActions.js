import axios from 'axios';
import config from '../../../config/config';
import {
  FETCH_KPIS_REQUEST,
  FETCH_KPIS_SUCCESS,
  FETCH_KPIS_FAILURE
} from '../actionsTypes/fetchKPIsActionTypes';

export const fetchKPI = id => {
  return dispatch => {
    dispatch(fetchKPIsRequest());
    axios
      .get(`${config.baseUrl}/kpis/${id}`)
      .then(response => dispatch(fetchKPIsSuccess(response.data)))
      .catch(error => dispatch(fetchKPIsFailure(error.response)));
  };
};

export const fetchKPIsRequest = () => {
  return {
    type: FETCH_KPIS_REQUEST
  };
};

export const fetchKPIsSuccess = users => {
  return {
    type: FETCH_KPIS_SUCCESS,
    payload: users
  };
};

export const fetchKPIsFailure = error => {
  return {
    type: FETCH_KPIS_FAILURE,
    payload: error
  };
};
