import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createKPI } from '../../redux/kpis/actions/createKPIActions';
import { addCreateKPIFlashMessage } from '../../redux/flashMessages/actions/createKPIFlashMessagesActions';
import CreateKPIErrorMessage from '../messages/CreateKPIErrorMessage';
import { deleteCreateKPIErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';

export class CreateKPIComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    this.props.createKPI(this.state);
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.createKPIData.createKPI !==
        nextProps.createKPIData.createKPI &&
      nextProps.createKPIData.createKPI != null
    ) {
      this.props.addCreateKPIFlashMessage(nextProps.createKPIData.createKPI);
      this.props.history.push('/admin');
    }
  }

  // Render the UI
  render() {
    const { title, description } = this.state;

    const { isLoading, errors } = this.props.createKPIData;

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
          style={{ width: '30rem' }}
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
                  onChange={this.onChange}
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  type="text"
                  value={title}
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
                    ' Create KPI'
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
    createKPIData: state.createKPIReducer,
    createKPIFlashMessages: state.createKPIFlashMessagesReducer
  };
};

export default connect(mapStateToProps, {
  createKPI,
  addCreateKPIFlashMessage,
  deleteCreateKPIErrorMessage
})(CreateKPIComponent);
