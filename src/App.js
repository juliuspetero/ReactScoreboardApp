import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import store from './redux/store';
import NavigationBar from './components/layouts/NavigationBar';
import AuthenticateUserComponent from './components/authentications/AuthenticateUserComponent';
import FooterComponent from './components/layouts/FooterComponent';
import EmployeesManagementComponent from './components/employees/EmployeesManagementComponent';
import UnauthorizedUserFlashMessage from './components/messages/UnauthorizedUserFlashMessage';
import authenticateComponent from './components/authentications/AuthenticateComponent';
import AdminComponent from './components/administratrators/AdminComponent';
import ManagerComponent from './components/managers/ManagerComponent';
import EmployeeComponent from './components/employees/EmployeeComponent';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Route path="/login" component={NavigationBar} />
          <Route path="/login" component={UnauthorizedUserFlashMessage} />
          <Route path="/login" component={AuthenticateUserComponent} />
          <Route
            path="/manage-employees"
            component={authenticateComponent(EmployeesManagementComponent)}
          />

          <Route
            path="/admin"
            component={authenticateComponent(AdminComponent)}
          />
          <Route
            path="/manager"
            component={authenticateComponent(ManagerComponent)}
          />
          <Route
            path="/employee"
            component={authenticateComponent(EmployeeComponent)}
          />
          <Route exact path="/" render={() => <Redirect to="/login" />} />

          <Route path="/login" component={FooterComponent} />

          {/* Redirect the user to the login page for any other route path */}
          {/* <Route path="*" render={() => <Redirect to="/login" />} /> */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
