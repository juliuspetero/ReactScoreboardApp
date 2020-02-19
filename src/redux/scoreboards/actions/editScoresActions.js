import axios from 'axios';
import isObject from 'lodash/isObject';
import config from '../../../config/config';
import validateEditScores from '../../../helpers/validateEditScores';

import {
  EDIT_SCORES_REQUEST,
  EDIT_SCORES_SUCCESS,
  EDIT_SCORES_FAILURE
} from '../actionsTypes/editScoresActionTypes';

// Action creators returns the action object
export const editScores = scoreboard => {
  console.log(scoreboard);

  return dispatch => {
    dispatch(editScoresRequest());
    // Write client side validation here
    const { errors, isValid } = validateEditScores(scoreboard);
    if (!isValid) dispatch(editScoresFailure({ data: errors }));
    else {
      // Prepare the request body for API call
      const scoreBoardId = scoreboard.scoreBoardId;
      let kpis = [];

      scoreboard.KPIIds.forEach((KPIId, index) => {
        kpis.push({
          id: KPIId,
          score: scoreboard.KPIScores[index]
        });
      });

      axios
        .put(`${config.baseUrl}/scoreboards/edit-kpi-scores`, {
          scoreBoardId,
          kpis
        })
        .then(response => {
          if (response.data) dispatch(editScoresSuccess(response.data));
          else
            dispatch(
              editScoresFailure({
                data: {
                  message: 'Something occur try again later...'
                }
              })
            );
        })
        .catch(error => {
          if (error.response) {
            if (isObject(error.response.data))
              dispatch(editScoresFailure(error.response));
            else
              dispatch(
                editScoresFailure({
                  data: {
                    message: 'Something occur try again later...'
                  }
                })
              );
          } else {
            dispatch(
              editScoresFailure({
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

export const editScoresRequest = () => {
  return {
    type: EDIT_SCORES_REQUEST
  };
};

export const editScoresSuccess = kpi => {
  return {
    type: EDIT_SCORES_SUCCESS,
    payload: kpi
  };
};

export const editScoresFailure = errors => {
  return {
    type: EDIT_SCORES_FAILURE,
    payload: errors
  };
};
