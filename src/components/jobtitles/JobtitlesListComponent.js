import React, { Component } from 'react';
import axios from 'axios';
import isArray from 'lodash/isArray';
import { connect } from 'react-redux';
import { fetchJobtitles } from '../../redux/jobtitles/actions/fetchJobtitlesActions';
import DeleteButtonComponent from './DeleteButtonComponent';
import config from '../../config/config';

export class JobtitlesListComponent extends Component {
  componentDidMount() {
    this.props.fetchJobtitles();
  }

  // Wipe the scoreboard out of memory
  deleteJobtitle = async id => {
    await axios.delete(`${config.baseUrl}/jobtitles/${id}`);
    this.props.fetchJobtitles();
  };

  render() {
    // Retrieve all the KPIs in from the API
    const { jobtitles, isLoading } = this.props.jobtitlesData;

    const departmentId = this.props.authenticateUserData.authenticateUser
      .userInformation.departmentId;

    // Filter out only the KPIs for the managers department
    const filteredJobtitlesList = isArray(jobtitles)
      ? jobtitles.filter(jobtitle => {
          if (jobtitle.departmentId === departmentId) return true;
          else if (departmentId === '3by786gk6s03j1h') return true;
          else return false;
        })
      : null;

    // List all the KPIs created
    const jobtitlesList = filteredJobtitlesList
      ? filteredJobtitlesList.map((jobtitle, index) => {
          // const timeAgo = moment(kpi.createdAt).fromNow();
          return (
            <tr key={index}>
              <th scope="row">{jobtitle.title}</th>
              <td>{jobtitle.department.title}</td>
              <td>
                <p>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.history.push(
                        `/admin/edit-jobtitle/${jobtitle.id}`
                      )
                    }
                    className="btn btn-light"
                  >
                    Edit
                  </button>
                </p>
                <p>
                  <DeleteButtonComponent
                    jobtitle={jobtitle}
                    deleteJobtitle={this.deleteJobtitle}
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
          {isLoading ? <div className="spinner-border"></div> : ''} All Job
          Titles
        </h3>
        <table
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
          id="employees-table"
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{jobtitlesList}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      jobtitlesData: state.fetchJobtitlesReducer,
      authenticateUserData: state.authenticateUserReducer
    };
  },
  {
    fetchJobtitles
  }
)(JobtitlesListComponent);
