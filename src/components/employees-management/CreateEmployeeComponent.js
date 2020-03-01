import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../redux/users/actions/createUserActions';
import { addCreateUserFlashMessage } from '../../redux/flashMessages/actions/createUserflashMessagesActions';
import CreateUserErrorMessage from '../messages/CreateUserErrorMessage';
import { deleteCreateUserErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { fetchRoles } from '../../redux/roles/actions/fetchRolesActions';
import { fetchDepartments } from '../../redux/departments/actions/fetchDepartmentsActions';
import { fetchJobtitles } from '../../redux/jobtitles/actions/fetchJobtitlesActions';

export class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: '',
      departmentId: '',
      sex: '',
      roles: [],
      employeeType: '',
      jobtitleId: '',
      jobDescription: ''
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    this.props.createUser(this.state);
  };

  onRoleChange = e => {
    const roles = [e.target.value];
    this.setState({
      roles
    });
  };

  componentDidMount() {
    this.props.fetchRoles();
    this.props.fetchDepartments();
    this.props.fetchJobtitles();
  }

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.createdUserData.createdUser !==
        nextProps.createdUserData.createdUser &&
      nextProps.createdUserData.createdUser != null
    ) {
      this.props.addCreateUserFlashMessage(
        nextProps.createdUserData.createdUser
      );
      this.props.history.push('/admin/all-employees');
    }
  }

  // Render the UI
  render() {
    const {
      username,
      password,
      email,
      passwordConfirmation,
      phoneNumber,
      departmentId,
      employeeType,
      jobtitleId,
      jobDescription
    } = this.state;

    const { isLoading, errors } = this.props.createdUserData;

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
              this.props.deleteCreateUserErrorMessage
            }
          ></CreateUserErrorMessage>
        ));
      }
    }
    // Find all the roles in the system and insert in the DOM
    let rolesOptions = null;
    if (this.props.rolesData.roles) {
      rolesOptions = this.props.rolesData.roles.map(role => (
        <option key={role.id} value={role.id}>
          {role.name}
        </option>
      ));
    }

    // Find all the departments in the system and insert in the DOM
    const departmentsOptions = this.props.departmentsData.departments
      ? this.props.departmentsData.departments.map(department => (
          <option key={department.id} value={department.id}>
            {department.title}
          </option>
        ))
      : null;

    // Find all the job titles in the system and insert in the DOM
    let jobtitlesOptions = this.props.jobtitlesData.jobtitles
      ? this.props.jobtitlesData.jobtitles
      : null;

    jobtitlesOptions = jobtitlesOptions
      ? jobtitlesOptions.filter(jt => {
          if (this.state.departmentId === '') {
            return true;
          }
          if (this.state.departmentId === jt.departmentId) return true;
          else return false;
        })
      : null;

    jobtitlesOptions = jobtitlesOptions
      ? jobtitlesOptions.map(jobtitle => (
          <option key={jobtitle.id} value={jobtitle.id}>
            {jobtitle.title}
          </option>
        ))
      : null;

    return (
      <React.Fragment>
        <div className="cardbg-light mx-auto">
          <article className="card-body mx-auto" style={{ width: 'auto' }}>
            <h4 className="card-title mt-3 text-center">
              Create an Employee's Account
            </h4>
            <div>{errorMessages}</div>
            <form onSubmit={this.onSubmit}>
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
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-phone"></i>
                  </span>
                </div>
                <input
                  onChange={this.onChange}
                  name="phoneNumber"
                  className="form-control"
                  placeholder="Phone number"
                  type="text"
                  value={phoneNumber}
                />
              </div>

              {/* Departments */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-building"></i>
                  </span>
                </div>
                <select
                  onChange={this.onChange}
                  name="departmentId"
                  value={departmentId}
                  className="form-control"
                >
                  <option value="">Select Department</option>
                  {departmentsOptions}
                </select>
              </div>

              {/* Hierachies */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-building"></i>
                  </span>
                </div>
                <select
                  onChange={this.onRoleChange}
                  name="role"
                  className="form-control"
                >
                  <option value="">Select Hierachy</option>
                  {rolesOptions}
                </select>
              </div>

              {/* Employee Types */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-building"></i>
                  </span>
                </div>
                <select
                  onChange={this.onChange}
                  name="employeeType"
                  className="form-control"
                  value={employeeType}
                >
                  <option value="">Select Employee Type</option>
                  <option value="fte">Full Time Employee</option>
                  <option value="contract">Contract Employee</option>
                  <option value="consultant">Consultant</option>
                </select>
              </div>

              {/* Job titles*/}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-building"></i>
                  </span>
                </div>
                <select
                  onChange={this.onChange}
                  name="jobtitleId"
                  className="form-control"
                  value={jobtitleId}
                >
                  <option value="">Select Job Title</option>
                  {jobtitlesOptions}
                </select>
              </div>

              {/* Job description */}
              <div className="form-group">
                <textarea
                  onChange={this.onChange}
                  name="jobDescription"
                  className="form-control"
                  rows="4"
                  placeholder="Job Description"
                  type="text"
                  value={jobDescription}
                ></textarea>
              </div>

              {/* Genger */}

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <div onChange={this.onChange}>
                  <label className="radio-inline mx-5">
                    <input type="radio" name="sex" value="Male" />
                    Male
                  </label>
                  <label className="radio-inline">
                    <input type="radio" name="sex" value="Female" />
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
                  placeholder="Create password"
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
                  placeholder="Repeat password"
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={this.onChange}
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
                    ' Create Account'
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
    createdUserData: state.createUserReducer,
    jobtitlesData: state.fetchJobtitlesReducer,
    createUserflashMessages: state.createUserflashMessagesReducer,
    rolesData: state.fetchRolesReducer,
    departmentsData: state.fetchDepartmentsReducer
  };
};

export default connect(mapStateToProps, {
  createUser,
  addCreateUserFlashMessage,
  deleteCreateUserErrorMessage,
  fetchRoles,
  fetchDepartments,
  fetchJobtitles
})(CreateEmployeeComponent);
