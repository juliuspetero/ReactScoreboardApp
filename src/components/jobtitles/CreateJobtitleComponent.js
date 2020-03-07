import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { createJobtitle } from '../../redux/jobtitles/actions/createJobtitleActions';
import { addCreateKPIFlashMessage } from '../../redux/flashMessages/actions/createKPIFlashMessagesActions';
import CreateKPIErrorMessage from '../messages/CreateKPIErrorMessage';
import { deleteCreateKPIErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { fetchDepartments } from '../../redux/departments/actions/fetchDepartmentsActions';
import { addSelectKPI } from '../../redux/kpis/actions/selectKPIActions';
import SelectKPIListComponent from '../kpis-management/SelectKPIsListComponent';

export class CreateJobtitleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      departmentId: '',
      componentIds: [],
      KPIIds: [],
      KPIWeights: []
    };
  }

  componentDidMount() {
    this.props.fetchDepartments();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    this.props.createJobtitle(this.state);
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
    if (
      this.props.createJobtitleData.createJobtitle !==
        nextProps.createJobtitleData.createJobtitle &&
      nextProps.createJobtitleData.createJobtitle != null
    ) {
      this.props.history.push('/admin/all-jobtitles');
    }
  }

  // Render the UI
  render() {
    const { title, departmentId } = this.state;

    const { isLoading, errors } = this.props.createJobtitleData;

    // Find all the departments in the system and insert in the DOM
    const departmentsOptions = this.props.departmentsData.departments
      ? this.props.departmentsData.departments.map(department => (
          <option key={department.id} value={department.id}>
            {department.title}
          </option>
        ))
      : null;

    // Set up the error messages
    const errorMessages = errors
      ? errors.data
        ? Object.keys(errors.data).map((key, index) => (
            <CreateKPIErrorMessage
              key={index}
              messageKey={key}
              messageValue={errors.data[key]}
              deleteCreateKPIErrorMessage={
                this.props.deleteCreateKPIErrorMessage
              }
            ></CreateKPIErrorMessage>
          ))
        : ''
      : '';

    return (
      <React.Fragment>
        <div
          className="mt-5 card bg-light text-center mx-auto"
          style={{ width: 'auto' }}
        >
          <div className="card-body">
            <h4 className="card-title mt-3 text-center">Create Job Title</h4>
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
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  type="text"
                  value={title}
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

              {/* Section for adding KPIs */}
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
                    ' Create Job Title'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// This maps application state from the store to this component
const mapStateToProps = state => {
  return {
    createJobtitleData: state.createJobtitleReducer,
    createKPIFlashMessages: state.createKPIFlashMessagesReducer,
    departmentsData: state.fetchDepartmentsReducer
  };
};

export default connect(mapStateToProps, {
  addSelectKPI,
  createJobtitle,
  fetchDepartments,
  addCreateKPIFlashMessage,
  deleteCreateKPIErrorMessage
})(CreateJobtitleComponent);
