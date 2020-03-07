import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { editJobtitle } from '../../redux/jobtitles/actions/editJobtitleActions';
import { fetchJobtitle } from '../../redux/jobtitles/actions/fetchJobtitleActions';
import { addCreateKPIFlashMessage } from '../../redux/flashMessages/actions/createKPIFlashMessagesActions';
import CreateKPIErrorMessage from '../messages/CreateKPIErrorMessage';
import { deleteCreateKPIErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { fetchDepartments } from '../../redux/departments/actions/fetchDepartmentsActions';
import config from '../../config/config';
import SelectKPIListComponent from '../kpis-management/SelectKPIsListComponent';
import { addSelectKPI } from '../../redux/kpis/actions/selectKPIActions';

export class EditJobtitleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      departmentId: '',
      jobtitle: null,
      componentIds: [],
      KPIIds: [],
      KPIWeights: []
    };
  }

  async componentDidMount() {
    this.props.fetchJobtitle(this.props.match.params.id);
    this.props.fetchDepartments();

    // Handle the current KPIs in the list
    const response = await axios.get(
      `${config.baseUrl}/jobtitles/${this.props.match.params.id}`
    );
    const jobtitle = await response.data;
    this.setState({
      jobtitle
    });

    // Add the KPIs in the select list for the user to begin with
    if (jobtitle) {
      if (jobtitle.scoreboardLayout) {
        jobtitle.scoreboardLayout.kpis.forEach(kpi => {
          this.props.addSelectKPI();
        });
      }
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // Handler for creation of a resource on the API
  onSubmit = e => {
    e.preventDefault();
    const body = {
      jobtitle: {
        id: this.state.jobtitle.id,
        title: this.state.title,
        departmentId: this.state.departmentId
      },
      scoreboardLayoutId: this.state.jobtitle.scoreboardLayout.id,
      KPIIds: this.state.KPIIds,
      KPIWeights: this.state.KPIWeights
    };

    this.props.editJobtitle(body);
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
    const KPIId = KPIIds[index];
    componentIds.splice(index, 1);
    KPIIds.splice(index, 1);
    KPIWeights.splice(index, 1);
    this.setState({
      componentIds,
      KPIIds,
      KPIWeights
    });

    // Delete the KPI state scoreboard
    const newKPIs = this.state.jobtitle.scoreboardLayout.kpis.filter(
      kpi => kpi.id !== KPIId
    );
    let newJobtitleState = this.state.jobtitle;
    newJobtitleState.scoreboardLayout.kpis = newKPIs;

    this.setState({
      jobtitle: newJobtitleState
    });
  };

  // Redirect back to all the job on successful edit
  UNSAFE_componentWillReceiveProps(nextProps) {
    const jobtitle = nextProps.jobtitleData.jobtitle;
    if (jobtitle) {
      // console.log(jobtitle);
      if (jobtitle.id) {
        this.setState({
          title: jobtitle.title,
          departmentId: jobtitle.departmentId
        });
      }
    }

    if (
      this.props.editJobtitleData.editJobtitle !==
        nextProps.editJobtitleData.editJobtitle &&
      nextProps.editJobtitleData.editJobtitle != null
    ) {
      this.props.history.push('/admin/all-jobtitles');
    }
  }

  // Render the UI
  render() {
    const { title, departmentId } = this.state;

    const { isLoading, errors } = this.props.editJobtitleData;

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
            <h4 className="card-title mt-3 text-center">Edit Job Title</h4>
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

              {/* The select list for the KPIs to go in the dashboard */}
              <SelectKPIListComponent
                onKPIChange={this.onKPIChange}
                onDeleteKPI={this.onDeleteKPI}
                selectedKPIs={
                  this.state.jobtitle
                    ? this.state.jobtitle.scoreboardLayout
                      ? this.state.jobtitle.scoreboardLayout.kpis
                      : null
                    : null
                }
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
                    'Edit Job Title'
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
    editJobtitleData: state.editJobtitleReducer,
    jobtitleData: state.fetchJobtitleReducer,
    createKPIFlashMessages: state.createKPIFlashMessagesReducer,
    departmentsData: state.fetchDepartmentsReducer
  };
};

export default connect(mapStateToProps, {
  editJobtitle,
  fetchJobtitle,
  fetchDepartments,
  addCreateKPIFlashMessage,
  deleteCreateKPIErrorMessage,
  addSelectKPI
})(EditJobtitleComponent);
