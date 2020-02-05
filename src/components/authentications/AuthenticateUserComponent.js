import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../redux/authentications/actions/authenticateUserActions';
import { addAuthenticateUserFlashMessage } from '../../redux/flashMessages/actions/authenticateUserFlashMessagesActions';
import AuthenticateUserErrorMessage from '../messages/AuthenticateUserErrorMessage';
import { deleteAuthenticateUserErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import './authentication.css';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';

export class AuthenticateUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props.authenticateUser(this.state);
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.authenticateUserData.authenticateUser !==
        nextProps.authenticateUserData.authenticateUser &&
      nextProps.authenticateUserData.authenticateUser != null
    ) {
      const authenticateUser = nextProps.authenticateUserData.authenticateUser;
      this.props.addAuthenticateUserFlashMessage(
        authenticateUser.userInformation
      );

      // Set the token to local storage
      localStorage.setItem('jwtToken', authenticateUser.token);
      setAuthorizationToken(authenticateUser.token);
      // Check he user role and push him to appropriate route
      this.props.history.push('/admin');
    }
  }

  render() {
    const { isLoading, errors } = this.props.authenticateUserData;

    // Set up the error messages
    let errorMessages = '';
    if (errors != null) {
      if (errors.data != null) {
        errorMessages = Object.keys(errors.data).map((key, index) => (
          <AuthenticateUserErrorMessage
            key={index}
            messageKey={key}
            messageValue={errors.data[key]}
            deleteAuthenticateUserErrorMessage={
              this.props.deleteAuthenticateUserErrorMessage
            }
          ></AuthenticateUserErrorMessage>
        ));
      }
    }

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign In</h5>
                  <div>{errorMessages}</div>
                  <form onSubmit={this.onSubmit} className="form-signin">
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        name="email"
                        placeholder="Email address"
                        value={this.state.email}
                        onChange={this.onChange}
                        // required
                        autoFocus
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange}
                        // required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>

                    <button
                      disabled={isLoading}
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      {isLoading ? (
                        <div>
                          <div className="spinner-border"></div>
                          <div>Please Wait...</div>
                        </div>
                      ) : (
                        ' Sign in'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  state => {
    return {
      authenticateUserData: state.authenticateUserReducer,
      authenticateUserFlashMessages: state.authenticateUserFlashMessagesReducer
    };
  },
  {
    authenticateUser,
    addAuthenticateUserFlashMessage,
    deleteAuthenticateUserErrorMessage
  }
)(AuthenticateUserComponent);
