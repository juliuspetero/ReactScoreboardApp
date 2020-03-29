import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createReport } from '../../redux/reports/actions/createReportActions';
import CreateUserErrorMessage from '../messages/CreateUserErrorMessage';
import { deleteCreateReportErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';

export class CreateReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      scoreBoardId: this.props.match.params.id,
      reportDocument: null
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // Upload document to support the scoreboard
  onFileChange = e => this.setState({ reportDocument: e.target.files[0] });
  onSubmit = e => {
    e.preventDefault();
    this.props.createReport(this.state);
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.createReportData.createReport !==
        nextProps.createReportData.createReport &&
      nextProps.createReportData.createReport != null
    ) {
      this.props.history.push(
        `/employee/reports/${this.props.match.params.id}`
      );
    }
  }

  // Render the UI
  render() {
    const { description } = this.state;
    const { isLoading, errors } = this.props.createReportData;

    // Set up the error messages
    let errorMessages = '';
    if (errors != null) {
      if (errors.data != null) {
        errorMessages = Object.keys(errors.data).map((key, index) => (
          <CreateUserErrorMessage
            key={index}
            messageKey={key}
            messageValue={errors.data[key]}
            deleteCreateUserErrorMessage={
              this.props.deleteCreateReportErrorMessage
            }
          ></CreateUserErrorMessage>
        ));
      }
    }

    return (
      <React.Fragment>
        <div className="cardbg-light mx-auto">
          <article className="card-body mx-auto" style={{ width: 'auto' }}>
            <h4 className="card-title mt-3 text-center">
              Upload Report Document
            </h4>
            <div>{errorMessages}</div>
            <form onSubmit={this.onSubmit} encType="multipart/form-data">
              {/* Job description */}
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
              {/* Document to upload */}
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-doc"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  type="file"
                  onChange={this.onFileChange}
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
                    'Upload Report'
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
    createReportData: state.createReportReducer
  };
};

export default connect(mapStateToProps, {
  createReport,
  deleteCreateReportErrorMessage
})(CreateReportComponent);
