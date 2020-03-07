import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { connect } from 'react-redux';
import { fetchSearchEmployees } from '../../redux/users/actions/fetchUsersActions.js';

export class SearchEmployeesComponent extends Component {
  onRowClicked = employee => {
    this.props.handleSelectedEmployee(employee);
  };

  render() {
    // Retrieve the current logged in user department
    const { authenticateUser } = this.props.authenticateUserData;

    // const { searchEmployees, isLoading } = this.prop.employees;
    let departmentEmployees = cloneDeep(this.props.employees);
    const departmentId = authenticateUser.userInformation.departmentId;

    // This is the admin, he should see all the users
    if (departmentId !== '3by786gk6s03j1h') {
      departmentEmployees = departmentEmployees.filter(employee => {
        return employee.departmentId === departmentId;
      });
    }

    if (departmentEmployees.length === 0) {
      return <h3 className="text-danger">Oops No employee found!</h3>;
    }

    const searchEmployeesList = departmentEmployees.map(employee => {
      return (
        <React.Fragment key={employee.id}>
          <tr onClick={() => this.onRowClicked(employee)}>
            <th scope="row">{employee.username}</th>
            <td>{employee.email}</td>
            <td>{employee.department.title}</td>
            <td>
              {employee.jobtitle ? employee.jobtitle.title : 'No Job Title'}
            </td>
            <td>{employee.roles[0] ? employee.roles[0].name : ''}</td>
          </tr>
        </React.Fragment>
      );
    });
    return (
      <div className="m5-3">
        <div className="spin-loader"></div>
        <h3 className="mb-2">
          {this.props.isLoading ? <div className="spinner-border"></div> : ''}
          Select an employee
        </h3>
        <table
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
          id="employees-table"
          // ref={el => (this.el = el)}
        >
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
              <th scope="col">Job Title</th>
              <th scope="col">Hierachy</th>
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
      searchEmployeesData: state.fetchSearchEmployeesReducer,
      authenticateUserData: state.authenticateUserReducer
    };
  },
  {
    fetchSearchEmployees
  }
)(SearchEmployeesComponent);
