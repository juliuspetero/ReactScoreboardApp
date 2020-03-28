import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editEmployeee } from '../../redux/users/actions/editUserActions';
import CreateUserErrorMessage from '../messages/CreateUserErrorMessage';
import { deleteEditEmployeeErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { fetchRoles } from '../../redux/roles/actions/fetchRolesActions';
import { fetchDepartments } from '../../redux/departments/actions/fetchDepartmentsActions';
import { fetchJobtitles } from '../../redux/jobtitles/actions/fetchJobtitlesActions';
import { fetchUser } from '../../redux/users/actions/fetchUserActions';

export class SettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      address: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: '',
      sex: '',
      profilePhoto: null
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // Photo Upload
  onFileChange = e => this.setState({ profilePhoto: e.target.files[0] });
  onSubmit = e => {
    e.preventDefault();
    this.props.editEmployeee(
      this.props.authenticateUserData.authenticateUser.userInformation.id,
      this.state
    );
  };

  onRoleChange = e => {
    const roles = [e.target.value];
    this.setState({
      roles
    });
  };

  componentDidMount() {
    this.props.fetchUser(
      this.props.authenticateUserData.authenticateUser.userInformation.id
    );
    this.props.fetchRoles();
    this.props.fetchDepartments();
    this.props.fetchJobtitles();
  }

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    // Populate the user data to state
    const user = nextProps.userData.user;
    if (user) {
      this.setState({
        username: user.username,
        email: user.email,
        address: user.address ? user.address : '',
        phoneNumber: user.phoneNumber,
        sex: user.sex
      });
    }

    if (
      this.props.editEmployeeData.editEmployee !==
        nextProps.editEmployeeData.editEmployee &&
      nextProps.editEmployeeData.editEmployee != null
    ) {
      this.props.history.push('/manager/my-details');
    }
  }

  // Render the UI
  render() {
    const {
      username,
      password,
      email,
      address,
      passwordConfirmation,
      sex,
      phoneNumber
    } = this.state;

    const { isLoading, errors } = this.props.editEmployeeData;

    // Set up the error messages
    let errorMessages = '';
    if (errors != null) {
      if (errors.data != null) {
        errorMessages = Object.keys(errors.data).map((key, index) => (
          <CreateUserErrorMessage
            key={index}
            messageKey={key}
            messageValue={errors.data[key]}
            deleteCreateUserErrorMessage={
              this.props.deleteEditEmployeeErrorMessage
            }
          ></CreateUserErrorMessage>
        ));
      }
    }

    return (
      <React.Fragment>
        <div className="cardbg-light mx-auto">
          <article className="card-body mx-auto" style={{ width: 'auto' }}>
            <h4 className="card-title mt-3 text-center">Settings</h4>
            <div>{errorMessages}</div>
            <form onSubmit={this.onSubmit} encType="multipart/form-data">
              {/* Username */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  onChange={this.onChange}
                  name="username"
                  className="form-control"
                  placeholder="Full name"
                  type="text"
                  value={username}
                />
              </div>

              {/* Email */}
              <div className="form-group input-group has-error">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
                <input
                  onChange={this.onChange}
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  type="email"
                  value={email}
                />
              </div>

              {/* Phone Number */}
              <div className="form-group input-group has-error">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-phone"></i>
                  </span>
                </div>
                <input
                  onChange={this.onChange}
                  name="phoneNumber"
                  className="form-control"
                  placeholder="Email address"
                  type="Phone Number"
                  value={phoneNumber}
                />
              </div>

              {/* Address */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-home"></i>
                  </span>
                </div>
                <input
                  onChange={this.onChange}
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  type="text"
                  value={address ? address : ''}
                />
              </div>

              {/* Genger */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-female"></i>
                  </span>
                </div>
                <div>
                  <label className="radio-inline mx-5">
                    <input
                      onChange={this.onChange}
                      checked={sex === 'Male'}
                      type="radio"
                      name="sex"
                      value="Male"
                    />
                    Male
                  </label>
                  <label className="radio-inline">
                    <input
                      onChange={this.onChange}
                      checked={sex === 'Female'}
                      type="radio"
                      name="sex"
                      value="Female"
                    />
                    Female
                  </label>
                </div>
              </div>

              {/* Password */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="New Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                />
              </div>

              {/* Password confirmation */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Repeat New Password"
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={this.onChange}
                />
              </div>

              {/* PROFILE PHOTO */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-profile"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  type="file"
                  onChange={this.onFileChange}
                />
              </div>

              <div className="form-group">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  {isLoading ? (
                    <div>
                      <div className="spinner-border-sm"></div>
                      <div>Please Wait...</div>
                    </div>
                  ) : (
                    'Update'
                  )}
                </button>
              </div>
            </form>
          </article>
        </div>
      </React.Fragment>
    );
  }
}

// This maps application state from the store to this component
const mapStateToProps = state => {
  return {
    editEmployeeData: state.editEmployeeReducer,
    jobtitlesData: state.fetchJobtitlesReducer,
    rolesData: state.fetchRolesReducer,
    departmentsData: state.fetchDepartmentsReducer,
    authenticateUserData: state.authenticateUserReducer,
    userData: state.fetchUserReducer
  };
};

export default connect(mapStateToProps, {
  editEmployeee,
  deleteEditEmployeeErrorMessage,
  fetchRoles,
  fetchDepartments,
  fetchJobtitles,
  fetchUser
})(SettingsComponent);
