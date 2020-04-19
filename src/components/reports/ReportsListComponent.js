import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchReports } from '../../redux/reports/actions/fetchReportsActions';
import DeleteButtonComponent from './DeleteButtonComponent';
import config from '../../config/config';

export class ReportsListComponent extends Component {
  componentDidMount() {
    this.props.fetchReports(this.props.match.params.id);
  }

  // Wipe the Report out of memory
  deleteReport = async (id) => {
    await axios.delete(`${config.baseUrl}/reports/${id}`);
    this.props.fetchReports(this.props.match.params.id);
  };

  render() {
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

    // Retrieve all the reporst in from the API
    const { reports, isLoading } = this.props.reportsData;

    if (reports.length === 0 && !isLoading)
      return <div className="mt-3 text-info h3">No Report</div>;

    // List all the reports created
    const reportsList = reports
      ? reports.map((report, index) => {
          return (
            <tr key={index}>
              <th scope="row">{report.description}</th>
              <td>
                {report.documentUrl ? (
                  <a
                    href={`${config.baseUrl}/uploads/${report.documentUrl}`}
                    target="_blank"
                    download
                    rel="noopener noreferrer"
                  >
                    click to download
                  </a>
                ) : (
                  'No report document uploaded'
                )}
              </td>
              <td>
                <p>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.history.push(
                        `/${pushTo}/edit-report/${report.id}`
                      )
                    }
                    className="btn btn-light"
                  >
                    Edit
                  </button>
                </p>
                <p>
                  <DeleteButtonComponent
                    report={report}
                    deleteReport={this.deleteReport}
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
          {isLoading ? <div className="spinner-border"></div> : ''} Report
          Documents
        </h3>
        <table
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
          id="employees-table"
        >
          <thead>
            <tr>
              <th>Description</th>
              <th>Report Document</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{reportsList}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      authenticateUserData: state.authenticateUserReducer,
      reportsData: state.fetchReportsReducer,
    };
  },
  {
    fetchReports,
  }
)(ReportsListComponent);
