import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchKPI } from '../../redux/kpis/actions/fetchKPIActions';
import { editKPI } from '../../redux/kpis/actions/editKPIActions';
import { addCreateKPIFlashMessage } from '../../redux/flashMessages/actions/createKPIFlashMessagesActions';
import CreateKPIErrorMessage from '../messages/CreateKPIErrorMessage';
import { deleteCreateKPIErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { fetchDepartments } from '../../redux/departments/actions/fetchDepartmentsActions';

export class EditKPIComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      departmentId: ''
    };
  }

  componentDidMount() {
    this.props.fetchKPI(this.props.match.params.id);
    this.props.fetchDepartments();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    this.props.editKPI(this.props.match.params.id, this.state);
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    const kpi = nextProps.kpiData.kpi;
    if (kpi) {
      this.setState({
        title: kpi.title,
        description: kpi.description,
        departmentId: kpi.departmentId
      });
    }

    if (
      this.props.editKPIData.createKPI !== nextProps.editKPIData.createKPI &&
      nextProps.editKPIData.createKPI != null
    ) {
      this.props.addCreateKPIFlashMessage(nextProps.editKPIData.createKPI);
      this.props.history.push('/admin/all-kpis');
    }
  }

  // Render the UI
  render() {
    const { title, description, departmentId } = this.state;

    const { isLoading, errors } = this.props.editKPIData;

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
                  value={title}
                  onChange={this.onChange}
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  type="text"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <textarea
                  onChange={this.onChange}
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Description"
                  type="text"
                  value={description}
                ></textarea>
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
                    ' Edit KPI'
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
    editKPIData: state.editKPIReducer,
    kpiData: state.fetchKPIReducer,
    createKPIFlashMessages: state.createKPIFlashMessagesReducer,
    departmentsData: state.fetchDepartmentsReducer
  };
};

export default connect(mapStateToProps, {
  fetchKPI,
  editKPI,
  fetchDepartments,
  addCreateKPIFlashMessage,
  deleteCreateKPIErrorMessage
})(EditKPIComponent);
