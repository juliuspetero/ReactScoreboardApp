import { LOG_OUT } from '../actionsTypes/logoutTypes';
import setAuthorizationToken from '../../../helpers/setAuthorizationToken';

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    // Dispatch the action here
    dispatch(deauthenticateUser());
  };
};

export const deauthenticateUser = () => {
  return {
    type: LOG_OUT
  };
};
