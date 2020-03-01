import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CreateScoreboardErrorMessage from '../messages/CreateScoreboardErrorMessage';
import { addSelectKPI } from '../../redux/kpis/actions/selectKPIActions';
import { createScoreboard } from '../../redux/scoreboards/actions/createScoreboardActions';
import SelectKPIListComponent from '../kpis-management/SelectKPIsListComponent';
import cloneDeep from 'lodash/cloneDeep';
import SearchEmployeesComponent from '../employees-management/SearchEmployeesComponent';
import config from '../../config/config';
import { deleteCreateScoreboardErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { addCreateScoreboardFlashMessage } from '../../redux/flashMessages/actions/createScoreboardFlashMessagesAction';

export class CreateScoreboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      query: '',
      componentIds: [],
      KPIIds: [],
      KPIWeights: [],
      loadSearchEmployee: false,
      employees: null,
      isLoading: false,
      selectedEmployee: null
    };
  }

  // Remove the selected employee
  removeSelectedEmployee = () => {
    this.setState({
      selectedEmployee: null,
      userId: ''
    });
  };

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
    this.setState({
      userId: employee.id,
      selectedEmployee: employee
    });
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

    if (this.state.selectedEmployee) {
      employees = (
        <div className="my-3">
          <h5>
            {this.state.selectedEmployee.username} of{' '}
            {this.state.selectedEmployee.department.title} is selected
          </h5>
          <button
            type="button"
            onClick={this.removeSelectedEmployee}
            className="btn btn-light btn-outline-danger float-right mb-3"
          >
            Remove {this.state.selectedEmployee.username}
          </button>
        </div>
      );
    }

    return employees;
  };

  // Handle for creation of a resource on the API
  onSubmit = e => {
    e.preventDefault();
    this.props.createScoreboard({
      userId: this.state.userId,
      KPIIds: this.state.KPIIds,
      KPIWeights: this.state.KPIWeights
    });
  };

  // Handle the KPIs to be added in the scoreboard
  onKPIChange = kpi => {
    const { componentIds, KPIIds, KPIWeights } = this.state;
    // Populate the state for initial values
    if (componentIds.length === 0) {
      this.setState({
        componentIds: [...componentIds, kpi.id],
        KPIIds: [...KPIIds, kpi.KPIId],
        KPIWeights: [...KPIWeights, kpi.KPIWeight]
      });
    } else {
      let count = 0;
      componentIds.forEach((componentId, index) => {
        // A new component is coming
        if (kpi.id !== componentId) count++;

        if (kpi.id === componentId) {
          // A component is to be updated
          const KPIIds = this.state.KPIIds;
          KPIIds[index] = kpi.KPIId;
          const KPIWeights = this.state.KPIWeights;
          KPIWeights[index] = kpi.KPIWeight;
          this.setState({
            KPIIds,
            KPIWeights
          });
        }
      });

      // There is no id which matches the incoming one
      if (count === componentIds.length) {
        this.setState({
          componentIds: [...componentIds, kpi.id],
          KPIIds: [...KPIIds, kpi.KPIId],
          KPIWeights: [...KPIWeights, kpi.KPIWeight]
        });
      }
    }
  };

  // Handle deleteKPI event
  onDeleteKPI = id => {
    const { componentIds, KPIIds, KPIWeights } = cloneDeep(this.state);
    const index = componentIds.indexOf(id);
    componentIds.splice(index, 1);
    KPIIds.splice(index, 1);
    KPIWeights.splice(index, 1);
    this.setState({
      componentIds,
      KPIIds,
      KPIWeights
    });
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { authenticateUser } = this.props.authenticateUserData;

    const roleId = authenticateUser.userInformation.roles[0].id;

    if (
      this.props.createScoreboardData.createScoreboard !==
        nextProps.createScoreboardData.createScoreboard &&
      nextProps.createScoreboardData.createScoreboard != null
    ) {
      this.props.addCreateScoreboardFlashMessage(
        nextProps.createScoreboardData.createScoreboard
      );

      this.props.history.push(
        `/${
          roleId === '3by786gk6s03iu3' ? 'manager' : 'admin'
        }/all-scoreboards/${this.state.selectedEmployee.id}`
      );
    }
  }

  // Render the UI
  render() {
    // console.log(this.state);
    const { isLoading, errors } = this.props.createScoreboardData;

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
    return (
      <React.Fragment>
        <div className="cardbg-light mx-auto">
          <article className="card-body mx-auto" style={{ width: 'auto' }}>
            <h4 className="card-title mt-3 text-center">
              Create an Employee's Scoreboard
            </h4>
            <div>{errorMessages}</div>
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

              {/* The select list for the KPIs to go in the dashboard */}
              <SelectKPIListComponent
                onKPIChange={this.onKPIChange}
                onDeleteKPI={this.onDeleteKPI}
              />
              <div className="text-left">
                <button
                  type="button"
                  onClick={() => this.props.addSelectKPI()}
                  className="btn btn-light btn-outline-secondary mb-2"
                >
                  Add KPI
                </button>
              </div>

              {/* Submit button */}
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
                    ' Create Scoreboard'
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
    createScoreboardData: state.createScoreboardReducer,
    authenticateUserData: state.authenticateUserReducer
  };
};

export default connect(mapStateToProps, {
  addSelectKPI,
  deleteCreateScoreboardErrorMessage,
  createScoreboard,
  addCreateScoreboardFlashMessage
})(CreateScoreboardComponent);
