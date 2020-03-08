import React, { Component } from 'react';
import axios from 'axios';
import isArray from 'lodash/isArray';
import { connect } from 'react-redux';
import { fetchDepartments } from '../../redux/departments/actions/fetchDepartmentsActions';
import DeleteButtonComponent from './DeleteButtonComponent';
import config from '../../config/config';

export class DepartmentsListComponent extends Component {
  componentDidMount() {
    this.props.fetchDepartments();
  }

  // Wipe the scoreboard out of memory
  deleteDepartment = async id => {
    await axios.delete(`${config.baseUrl}/departments/${id}`);
    this.props.fetchDepartments();
  };

  render() {
    // Retrieve all the KPIs in from the API
    const { departments, isLoading } = this.props.departmentsData;

    const departmentId = this.props.authenticateUserData.authenticateUser
      .userInformation.departmentId;

    // Filter out only the KPIs for the managers department
    const filteredDepartmentsList = isArray(departments)
      ? departments.filter(jobtitle => {
          if (jobtitle.departmentId === departmentId) return true;
          else if (departmentId === '3by786gk6s03j1h') return true;
          else return false;
        })
      : null;

    // List all the KPIs created
    const departmentsList = filteredDepartmentsList
      ? filteredDepartmentsList.map((department, index) => {
          // const timeAgo = moment(kpi.createdAt).fromNow();
          return (
            <tr key={index}>
              <th scope="row">{department.title}</th>
              <td>
                <p>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.history.push(
                        `/admin/edit-department/${department.id}`
                      )
                    }
                    className="btn btn-light"
                  >
                    Edit
                  </button>
                </p>
                <p>
                  <DeleteButtonComponent
                    department={department}
                    deleteDepartment={this.deleteDepartment}
                  />
                </p>
              </td>
            </tr>
          );
        })
      : null;
    return (
      <div className="my-3">
        <div className="spin-loader"></div>
        <h3 className="mb-2">
          {isLoading ? <div className="spinner-border"></div> : ''}
          Departments
        </h3>
        <table
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
          id="employees-table"
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{departmentsList}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      departmentsData: state.fetchDepartmentsReducer,
      authenticateUserData: state.authenticateUserReducer
    };
  },
  {
    fetchDepartments
  }
)(DepartmentsListComponent);
