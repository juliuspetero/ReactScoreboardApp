import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isArray from 'lodash/isArray';
import { connect } from 'react-redux';
import { fetchScoreboardLayout } from '../../redux/scoreboards/actions/fetchScoreboardAction';
import { fetchUser } from '../../redux/users/actions/fetchUserActions';

export class ScoreboardDetailsComponent extends Component {
  componentDidMount() {
    this.props.fetchScoreboardLayout(this.props.match.params.id);
    this.props.fetchUser(this.props.match.params.id);
  }

  render() {
    // Retrieve all the KPIs in from the API
    const { scoreboards, isLoading, error } = this.props.scoreboardsData;

    if (isLoading) {
      return <div className="spinner-border mt-3"></div>;
    }

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
        <h3 className="mb-2">
          {this.props.userData.user ? this.props.userData.user.username : null}
          's KPIs
        </h3>
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
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      scoreboardsData: state.fetchScoreboardsReducer,
      authenticateUserData: state.authenticateUserReducer,
      userData: state.fetchUserReducer
    };
  },
  {
    fetchScoreboardLayout,
    fetchUser
  }
)(ScoreboardDetailsComponent);
