import axios from 'axios';
import isObject from 'lodash/isObject';
import config from '../../../config/config';
import validateEditScoreboard from '../../../helpers/validateEditScoreboard';

import {
  EDIT_SCOREBOARD_REQUEST,
  EDIT_SCOREBOARD_SUCCESS,
  EDIT_SCOREBOARD_FAILURE
} from '../actionsTypes/editScoreboardActionTypes';

// Action creators returns the action object
export const editScoreboard = scoreboard => {
  console.log(scoreboard);

  return dispatch => {
    dispatch(editScoreboardRequest());
    // Write client side validation here
    const { errors, isValid } = validateEditScoreboard(scoreboard);
    if (!isValid) dispatch(editScoreboardFailure({ data: errors }));
    else {
      // Prepare the request body for API call
      const scoreBoardId = scoreboard.scoreBoardId;
      let kpis = [];

      scoreboard.KPIIds.forEach((KPIId, index) => {
        kpis.push({
          id: KPIId,
          weight: scoreboard.KPIWeights[index]
        });
      });

      axios
        .put(`${config.baseUrl}/scoreboards/edit-kpi-weights`, {
          scoreBoardId,
          kpis
        })
        .then(response => {
          if (response.data) dispatch(editScoreboardSuccess(response.data));
          else
            dispatch(
              editScoreboardFailure({
                data: {
                  message: 'Something occur try again later...'
                }
              })
            );
        })
        .catch(error => {
          if (error.response) {
            if (isObject(error.response.data))
              dispatch(editScoreboardFailure(error.response));
            else
              dispatch(
                editScoreboardFailure({
                  data: {
                    message: 'Something occur try again later...'
                  }
                })
              );
          } else {
            dispatch(
              editScoreboardFailure({
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

export const editScoreboardRequest = () => {
  return {
    type: EDIT_SCOREBOARD_REQUEST
  };
};

export const editScoreboardSuccess = kpi => {
  return {
    type: EDIT_SCOREBOARD_SUCCESS,
    payload: kpi
  };
};

export const editScoreboardFailure = errors => {
  return {
    type: EDIT_SCOREBOARD_FAILURE,
    payload: errors
  };
};
