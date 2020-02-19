import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchScoreboards } from '../../redux/scoreboards/actions/fetchScoreboardsActions';
import config from '../../config/config';
import DeleteButtonComponent from './DeleteButtonComponent';

export class ScoreboardsListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isApproved: false
    };
  }

  // Toggle status of the the approval
  onChangeApproval = () => {
    this.setState({
      isApproved: !this.state.isApproved
    });
  };

  componentDidMount() {
    this.props.fetchScoreboards(this.props.match.params.id);
  }

  deleteScoreboard = async id => {
    await axios.delete(`${config.baseUrl}/scoreboards/${id}`);
    this.props.fetchScoreboards(this.props.match.params.id);
  };

  render() {
    // Retrieve the current logged in user department
    const { authenticateUser } = this.props.authenticateUserData;

    const { scoreboards, isLoading } = this.props.scoreboardsData;

    if (scoreboards.length === 0) {
      return (
        <div>
          {' '}
          <h3 className="mt-5 text-info">
            No scoreboard for employee with ID = {this.props.match.params.id}
          </h3>
          <NavLink to="/admin/create-scoreboard">
            <button class="btn btn-light btn-outline-info m-2">
              Create Scoreboard
            </button>
          </NavLink>
        </div>
      );
    }

    let clonedDepartmentScoreboards = cloneDeep(scoreboards);
    const departmentId = authenticateUser.userInformation.departmentId;

    // This is the admin, he should see all the users scoreboards
    if (departmentId !== '3by786gk6s03j1h') {
      clonedDepartmentScoreboards = clonedDepartmentScoreboards.filter(
        scoreboard => {
          return scoreboard.departmentId === departmentId;
        }
      );
    }

    // Calculating cummulatibe average
    let averageScoresList = [];

    // Push al the average score
    clonedDepartmentScoreboards.forEach((scoreboard, index) => {
      // Calculating average scores
      let totalWeights = 0;

      scoreboard.kpis.forEach(kpi => {
        totalWeights += kpi.kPIScoreBoard.KPIWeight;
      });

      let averageScore = 0;

      for (let i = 0; i < scoreboard.kpis.length; i++) {
        const kpi = scoreboard.kpis[i];
        const score =
          (kpi.kPIScoreBoard.KPIScore * kpi.kPIScoreBoard.KPIWeight) /
          totalWeights;
        averageScore += score;
      }

      averageScoresList.push(averageScore);
    });

    // Create the page
    const departmentScoreboards = clonedDepartmentScoreboards.map(
      (scoreboard, index) => {
        // Calculating average scores
        let totalWeights = 0;

        scoreboard.kpis.forEach(kpi => {
          totalWeights += kpi.kPIScoreBoard.KPIWeight;
        });

        let averageScore = 0;

        for (let i = 0; i < scoreboard.kpis.length; i++) {
          const kpi = scoreboard.kpis[i];
          const score =
            (kpi.kPIScoreBoard.KPIScore * kpi.kPIScoreBoard.KPIWeight) /
            totalWeights;
          averageScore += score;
        }

        // cummulativeAverages.push(averageScore);

        const kpiTitles = scoreboard.kpis.map(kpi => {
          return <td key={kpi.id}>{kpi.title}</td>;
        });
        const kpiScores = scoreboard.kpis.map(kpi => {
          return (
            <td key={kpi.id}>
              {kpi.kPIScoreBoard.KPIScore != null
                ? kpi.kPIScoreBoard.KPIScore
                : 0}
            </td>
          );
        });

        // Calcualting cummulative average

        let cummulativeAverageScores = 0;
        for (
          let current = index;
          current < averageScoresList.length;
          current++
        ) {
          cummulativeAverageScores += averageScoresList[current];
          // console.log(cummulativeAverages[current]);
        }

        // console.log(averageScoresList);

        const kpiWeights = scoreboard.kpis.map(kpi => {
          return (
            <td key={kpi.id}>
              {kpi.kPIScoreBoard.KPIWeight != null
                ? kpi.kPIScoreBoard.KPIWeight
                : 0}
            </td>
          );
        });

        return (
          <React.Fragment key={scoreboard.id}>
            <tr>
              <td>{moment(scoreboard.createdAt).format('DD/MM/YYYY')}</td>
              <td>{moment(scoreboard.updated).format('DD/MM/YYYY')}</td>
              <td>
                <table className="container">
                  <tbody>
                    <tr>
                      <th>Title</th>
                      {kpiTitles}
                    </tr>
                    <tr>
                      <th>Weight</th>
                      {kpiWeights}
                    </tr>
                    <tr>
                      <th>Score</th>
                      {kpiScores}
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="text-center">{averageScore.toFixed(1)}</td>
              <td className="text-center">
                {(
                  cummulativeAverageScores /
                  (averageScoresList.length - index)
                ).toFixed(1)}
              </td>
              <td className="">
                <p>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.history.push(
                        `/admin/edit-scoreboard/${scoreboard.id}`
                      )
                    }
                    className="btn btn-light"
                  >
                    Update Scoreboard
                  </button>
                </p>
                <p>
                  <button
                    type="button"
                    onClick={this.onChangeApproval}
                    className="btn btn-light"
                  >
                    {this.state.isApproved ? 'Approved' : 'Not Approved'}
                  </button>
                </p>
                <p>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.history.push(
                        `/admin/edit-scores/${scoreboard.id}`
                      )
                    }
                    className="btn btn-light"
                  >
                    Update Scores
                  </button>
                </p>
                <p>
                  <DeleteButtonComponent
                    scoreboard={scoreboard}
                    deleteScoreboard={this.deleteScoreboard}
                  />
                </p>
              </td>
            </tr>
          </React.Fragment>
        );
      }
    );
    return (
      <div className="my-3">
        <div className="spin-loader"></div>
        <h3 className="mb-2">
          {isLoading ? <div className="spinner-border"></div> : ''}{' '}
          {clonedDepartmentScoreboards.length > 0
            ? clonedDepartmentScoreboards[0].user.username + "'s Scoreboards"
            : 'No scoreboard to display'}
        </h3>
        <table
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
          id="employees-table"
          // ref={el => (this.el = el)}
        >
          <thead>
            <tr>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th className="text-center" scope="col">
                KPIs
              </th>
              <th>Average Score</th>
              <th>Cummulative Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{departmentScoreboards}</tbody>
        </table>
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
    fetchScoreboards
  }
)(ScoreboardsListComponent);
