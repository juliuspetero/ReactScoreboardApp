import axios from 'axios';
import isObject from 'lodash/isObject';
import config from '../../../config/config';
import validateCreateScoreboardList from '../../../helpers/validateCreateScoreboardList';

import {
  CREATE_SCOREBOARD_REQUEST,
  CREATE_SCOREBOARD_SUCCESS,
  CREATE_SCOREBOARD_FAILURE
} from '../actionsTypes/createScoreboardActionTypes';
import cloneDeep from 'lodash/cloneDeep';

// Action creators returns the action object
export const createScoreboardList = scoreboard => {
  return dispatch => {
    dispatch(createScoreboardRequest());
    // Write client side validation here
    const { errors, isValid } = validateCreateScoreboardList(
      cloneDeep(scoreboard)
    );

    if (!isValid) dispatch(createScoreboardFailure({ data: errors }));
    else {
      axios
        .post(`${config.baseUrl}/scoreboards`, scoreboard)
        .then(response => {
          if (response.data) dispatch(createScoreboardSuccess(response.data));
          else
            dispatch(
              createScoreboardFailure({
                data: {
                  message: 'Something occur try again later...'
                }
              })
            );
        })
        .catch(error => {
          if (error.response) {
            if (isObject(error.response.data))
              dispatch(createScoreboardFailure(error.response));
            else
              dispatch(
                createScoreboardFailure({
                  data: {
                    message: 'Something occur try again later...'
                  }
                })
              );
          } else {
            dispatch(
              createScoreboardFailure({
                data: {
                  message: 'Something occur try again later...'
                }
              })
            );
          }
        });
    }
  };
};

export const createScoreboardRequest = () => {
  return {
    type: CREATE_SCOREBOARD_REQUEST
  };
};

export const createScoreboardSuccess = kpi => {
  return {
    type: CREATE_SCOREBOARD_SUCCESS,
    payload: kpi
  };
};

export const createScoreboardFailure = errors => {
  return {
    type: CREATE_SCOREBOARD_FAILURE,
    payload: errors
  };
};
