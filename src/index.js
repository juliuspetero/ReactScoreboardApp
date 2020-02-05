import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import setAuthorizationToken from './helpers/setAuthorizationToken';
import store from './redux/store';
import { authenticateUserSuccess } from './redux/authentications/actions/authenticateUserActions';

// Set authorization on every page reload
if (localStorage.jwtToken) {
  const token = localStorage.getItem('jwtToken');
  setAuthorizationToken(token);
  // Dispatch an action
  const user = jwt.decode(token);
  store.dispatch(authenticateUserSuccess(user));
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
