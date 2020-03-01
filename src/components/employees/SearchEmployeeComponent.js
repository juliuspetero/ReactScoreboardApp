import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SearchEmployeesComponent from '../employees-management/SearchEmployeesComponent';
import config from '../../config/config';

export class SearchEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      employees: null,
      isLoading: false
    };
  }

  // Load search results in the state
  loadSearchResults = async query => {
    this.setState({
      isLoading: true
    });
    const res = await axios.get(
      `${config.baseUrl}/users/search?query=${query}`
    );
    const employees = await res.data;
    this.setState({
      isLoading: false,
      employees
    });
  };

  // Handle the selected employee
  handleSelectedEmployee = employee => {
    const { authenticateUser } = this.props.authenticateUserData;
    const roleId = authenticateUser.userInformation.roles[0].id;
    this.props.history.push(
      `/${roleId === '3by786gk6s03iu3' ? 'manager' : 'admin'}/all-employees/${
        employee.id
      }`
    );
  };

  // Handle state change i.e. the query parameter
  onChange = e => {
    this.loadSearchResults(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  // Displays all the employee searched on the page
  renderSearchEmployees = () => {
    let employees = <h5 className="my-3">Employees will be displayed here</h5>;
    if (this.state.employees && this.state.query !== '') {
      employees = (
        <SearchEmployeesComponent
          employees={this.state.employees}
          isLoading={this.state.isLoading}
          handleSelectedEmployee={this.handleSelectedEmployee}
        />
      );
    }

    return employees;
  };

  // Call flash messages on successful user creation

  // Render the UI
  render() {
    return (
      <React.Fragment>
        <div className="cardbg-light mx-auto">
          <article className="card-body mx-auto" style={{ width: 'auto' }}>
            <h4 className="card-title mt-3 text-center">
              Search an employee using email or username
            </h4>
            <form onSubmit={this.onSubmit}>
              {/* Employee Details */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  onChange={this.onChange}
                  name="query"
                  className="form-control"
                  placeholder="Search employee by email/name"
                  type="text"
                  value={this.state.query}
                />
              </div>

              {/* Display searched employees here */}
              {this.renderSearchEmployees()}
            </form>
          </article>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(state => {
  return {
    authenticateUserData: state.authenticateUserReducer
  };
})(SearchEmployeeComponent);
