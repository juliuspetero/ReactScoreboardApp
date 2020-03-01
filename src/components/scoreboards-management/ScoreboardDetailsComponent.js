import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchScoreboardLayout } from '../../redux/scoreboards/actions/fetchScoreboardAction';
import config from '../../config/config';
import DeleteButtonComponent from './DeleteButtonComponent';
import isArray from 'lodash/isArray';

export class ScoreboardDetailsComponent extends Component {
  componentDidMount() {
    this.props.fetchScoreboardLayout(this.props.match.params.id);
  }

  deleteScoreboardLayout = async id => {
    console.log(id);
    await axios.delete(`${config.baseUrl}/scoreboardlayouts/${id}`);
    this.props.history.push(
      `/admin/all-employees/${this.props.match.params.id}`
    );
  };

  render() {
    // Retrieve all the KPIs in from the API
    const { scoreboards, isLoading, error } = this.props.scoreboardsData;

    if (error) {
      // console.log(error.status);

      if (error.status === 404) {
        return (
          <div className="mt-5">
            <h3>The employee's KPIs have not yet been created</h3>

            <Link
              className="btn btn-secondary mt-3"
              to={`/admin/create-scoreboardlayout/${this.props.match.params.id}`}
            >
              Create KPIs
            </Link>
          </div>
        );
      }
    }
    if (isArray(scoreboards)) {
      return <div />;
    }

    // List all the KPIs created
    const kpisList = scoreboards.kpis.map((kpi, index) => {
      return (
        <tr key={index}>
          <th scope="row">{kpi.title}</th>
          <td>{kpi.description}</td>
          <td>{kpi.kPIScoreboardLayouts.KPIWeight}</td>
        </tr>
      );
    });

    return (
      <div className="my-5">
        {isLoading ? <div className="spinner-border"></div> : ''}
        <h3 className="mb-2">{scoreboards.user.username}'s KPIs</h3>
        <table
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
          id="employees-table"
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>{kpisList}</tbody>
        </table>
        <div className="text-center">
          <Link
            to={`/admin/edit-scoreboard/${this.props.match.params.id}`}
            className="btn btn-primary mr-3"
          >
            Edit{' '}
          </Link>

          <DeleteButtonComponent
            scoreboard={scoreboards}
            deleteScoreboard={this.deleteScoreboardLayout}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      scoreboardsData: state.fetchScoreboardsReducer,
      authenticateUserData: state.authenticateUserReducer
    };
  },
  {
    fetchScoreboardLayout
  }
)(ScoreboardDetailsComponent);
