import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/users/actions/fetchUsersActions.js';
import CreateScoreboardErrorMessage from '../messages/CreateScoreboardErrorMessage';
import { createScoreboardList } from '../../redux/scoreboards/actions/createScoreboardListActions';
import { deleteCreateScoreboardErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { addCreateScoreboardFlashMessage } from '../../redux/flashMessages/actions/createScoreboardFlashMessagesAction';
import '../../assets/css/checkbox.css';

export class CreateScoreboardEmployeesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: null,
      allChecked: false
    };
  }

  onClick = () => {
    let userIds = [];
    this.state.employees.forEach(employee => {
      if (employee.isChecked) {
        userIds.push(employee.id);
      }
    });

    this.props.createScoreboardList({ userIds });
  };

  onToggle = id => {
    this.state.employees.forEach((e, index) => {
      if (e.id === id) {
        const employees = this.state.employees;
        employees[index].isChecked = !employees[index].isChecked;
        this.setState({
          employees
        });
      }
    });
  };

  onToggleAll = () => {
    this.setState({
      allChecked: !this.state.allChecked
    });

    const employees = this.state.employees;
    this.state.employees.forEach((e, index) => {
      employees[index].isChecked = !this.state.allChecked;
    });

    this.setState({ employees });
  };

  toggleCheck = () => {};
  componentDidMount() {
    this.props.fetchUsers();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Create checklist
    const employees = nextProps.usersData.users.map(user => {
      return {
        id: user.id,
        isChecked: false
      };
    });
    this.setState({
      employees
    });

    const { authenticateUser } = this.props.authenticateUserData;

    const roleId = authenticateUser.userInformation.roles[0].id;

    if (
      this.props.createScoreboardData.createScoreboard !==
        nextProps.createScoreboardData.createScoreboard &&
      nextProps.createScoreboardData.createScoreboard != null
    ) {
      console.log(nextProps.createScoreboardData.createScoreboard);
      this.props.addCreateScoreboardFlashMessage(
        nextProps.createScoreboardData.createScoreboard
      );

      this.props.history.push(
        `/${roleId === '3by786gk6s03iu3' ? 'manager' : 'admin'}`
      );
    }
  }

  render() {
    // Retrieve the current logged in user department
    const { authenticateUser } = this.props.authenticateUserData;

    // const { searchEmployees, isLoading } = this.prop.employees;
    let departmentEmployees = cloneDeep(this.props.usersData.users);
    const departmentId = authenticateUser.userInformation.departmentId;

    // This is the admin, he should see all the users
    if (departmentId !== '3by786gk6s03j1h') {
      departmentEmployees = departmentEmployees.filter(employee => {
        return employee.departmentId === departmentId;
      });
    }

    if (departmentEmployees.length === 0 && this.props.usersData.isLoading) {
      return <div className="spinner-border mt-3"></div>;
    }

    if (departmentEmployees.length === 0 && !this.props.usersData.isLoading) {
      return <h3 className="text-danger mt-3">Oops No employee found!</h3>;
    }

    // Create scoreboard data
    const { isLoading, errors } = this.props.createScoreboardData;

    // Error section
    const errorMessages = errors
      ? errors.data
        ? Object.keys(errors.data).map((key, index) => (
            <CreateScoreboardErrorMessage
              key={index}
              messageKey={key}
              messageValue={errors.data[key]}
              deleteCreateScoreboardErrorMessage={
                this.props.deleteCreateScoreboardErrorMessage
              }
            ></CreateScoreboardErrorMessage>
          ))
        : null
      : null;

    const searchEmployeesList = departmentEmployees.map((employee, index) => {
      return (
        <React.Fragment key={employee.id}>
          <tr>
            <th scope="row">
              <div className="checkbox">
                <label style={{ fontSize: '1.2em' }}>
                  <input
                    type="checkbox"
                    value={employee.id}
                    onChange={() => this.onToggle(employee.id)}
                    checked={
                      this.state.employees
                        ? this.state.employees[index].isChecked
                        : false
                    }
                  />
                  <span className="cr">
                    <i className="cr-icon fa fa-check"></i>
                  </span>
                </label>
              </div>
            </th>
            <th scope="row">{employee.username}</th>
            <td>{employee.email}</td>
            <td>{employee.department.title}</td>
            <td>{employee.roles[0] ? employee.roles[0].name : ''}</td>
          </tr>
        </React.Fragment>
      );
    });
    return (
      <div className="m5-3">
        <div className="spin-loader"></div>
        <h3 className="mb-2">
          {this.props.usersData.isLoading ? (
            <div className="spinner-border"></div>
          ) : (
            ''
          )}

          <button
            disabled={isLoading}
            onClick={this.onClick}
            type="button"
            className="btn btn-secondary mt-3"
          >
            {isLoading ? 'Please wait... ' : 'Create Scoreboards'}
          </button>
        </h3>
        <div className="mt-4">{errorMessages}</div>
        <table
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
          id="employees-table"
          // ref={el => (this.el = el)}
        >
          <thead>
            <tr>
              <th>
                <div className="checkbox">
                  <label style={{ fontSize: '1.2em' }}>
                    <input
                      type="checkbox"
                      value=""
                      onClick={this.onToggleAll}
                    />
                    <span className="cr">
                      <i className="cr-icon fa fa-check"></i>
                    </span>
                  </label>
                </div>
              </th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
              <th scope="col">Position</th>
            </tr>
          </thead>
          <tbody>{searchEmployeesList}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      usersData: state.fetchUsersReducer,
      createScoreboardData: state.createScoreboardReducer,
      authenticateUserData: state.authenticateUserReducer
    };
  },
  {
    fetchUsers,
    createScoreboardList,
    deleteCreateScoreboardErrorMessage,
    addCreateScoreboardFlashMessage
  }
)(CreateScoreboardEmployeesList);
