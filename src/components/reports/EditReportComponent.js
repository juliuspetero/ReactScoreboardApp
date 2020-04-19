import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editReport } from '../../redux/reports/actions/editReportActions';
import { fetchReport } from '../../redux/reports/actions/fetchReportActions';
import CreateUserErrorMessage from '../messages/CreateUserErrorMessage';
import { deleteEditReportErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';

export class EditReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      scoreBoardId: this.props.match.params.id,
      reportDocument: null,
    };
  }

  componentDidMount() {
    this.props.fetchReport(this.props.match.params.id);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // Upload document to support the scoreboard
  onFileChange = (e) => this.setState({ reportDocument: e.target.files[0] });
  onSubmit = (e) => {
    e.preventDefault();
    this.props.editReport(this.props.match.params.id, this.state);
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    const roleId = this.props.authenticateUserData.authenticateUser
      .userInformation.roles[0].id;
    let pushTo = null;
    if (roleId === '3by786gk6s03iu2') {
      pushTo = 'admin';
    } else if (roleId === '3by786gk6s03iu3') {
      pushTo = 'manager';
    } else if (roleId === '3by786gk6s03iu4') {
      pushTo = 'employee';
    }
    // Populate the report data to state
    const report = nextProps.reportData.report;
    if (report) {
      this.setState({
        description: report.description,
        scoreBoardId: report.scoreBoardId,
      });
    }

    if (
      this.props.editReportData.editReport !==
        nextProps.editReportData.editReport &&
      nextProps.editReportData.editReport != null
    ) {
      this.props.history.push(`/${pushTo}/reports/${report.scoreBoardId}`);
    }
  }

  // Render the UI
  render() {
    const { description } = this.state;

    const { isLoading, errors } = this.props.editReportData;

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
              this.props.deleteEditReportErrorMessage
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
              Edit Report Document
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
                    'Edit'
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
const mapStateToProps = (state) => {
  return {
    editReportData: state.editReportReducer,
    authenticateUserData: state.authenticateUserReducer,
    reportData: state.fetchReportReducer,
  };
};

export default connect(mapStateToProps, {
  editReport,
  fetchReport,
  deleteEditReportErrorMessage,
})(EditReportComponent);
