import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';
import store from './redux/store';
import NavigationBar from './components/layouts/NavigationBar';
import AuthenticateUserComponent from './components/authentications/AuthenticateUserComponent';
import UnauthorizedUserFlashMessage from './components/messages/UnauthorizedUserFlashMessage';
import authorizeAdminComponent from './components/authentications/AuthorizeAdminComponent';
import authorizeEmployeeComponent from './components/authentications/AuthorizeEmployeeComponent';
import authorizeManagerComponent from './components/authentications/AuthorizeManagerComponent';
import AdminComponent from './components/administratrators/AdminComponent';
import ManagerComponent from './components/managers/ManagerComponent';
import EmployeeComponent from './components/employees/EmployeeComponent';
import NoMatch404 from './components/layouts/NoMatch404';

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <NavigationBar />
                  <UnauthorizedUserFlashMessage />
                  <AuthenticateUserComponent />
                </React.Fragment>
              )}
            />

            <Route
              path="/admin"
              component={authorizeAdminComponent(AdminComponent)}
            />
            <Route
              path="/manager"
              component={authorizeManagerComponent(ManagerComponent)}
            />
            <Route
              path="/employee"
              component={authorizeEmployeeComponent(EmployeeComponent)}
            />
            <Route exact path="/login" render={() => <Redirect to="/" />} />
            <Route component={NoMatch404} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
