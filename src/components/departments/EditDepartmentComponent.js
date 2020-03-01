import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editDepartment } from '../../redux/departments/actions/editDepartmentActions';
import { fetchDepartment } from '../../redux/departments/actions/fetchDepartmentAction';
import { addCreateKPIFlashMessage } from '../../redux/flashMessages/actions/createKPIFlashMessagesActions';
import CreateKPIErrorMessage from '../messages/CreateKPIErrorMessage';
import { deleteCreateKPIErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';

export class EditDepartmentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  componentDidMount() {
    this.props.fetchDepartment(this.props.match.params.id);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    this.props.editDepartment(this.props.match.params.id, this.state);
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    const department = nextProps.departmentData.department;
    if (department) {
      this.setState({
        title: department.title
      });
    }

    if (
      this.props.editDepartmentData.editDepartment !==
        nextProps.editDepartmentData.editDepartment &&
      nextProps.editDepartmentData.editDepartment != null
    ) {
      this.props.history.push('/admin/all-departments');
    }
  }

  // Render the UI
  render() {
    const { title } = this.state;

    const { isLoading, errors } = this.props.editDepartmentData;

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
            <h4 className="card-title mt-3 text-center">Edit Department</h4>
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
                    'Edit Department'
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
    editDepartmentData: state.editDepartmentReducer,
    departmentData: state.fetchDepartmentReducer,
    createKPIFlashMessages: state.createKPIFlashMessagesReducer
  };
};

export default connect(mapStateToProps, {
  editDepartment,
  fetchDepartment,
  addCreateKPIFlashMessage,
  deleteCreateKPIErrorMessage
})(EditDepartmentComponent);
