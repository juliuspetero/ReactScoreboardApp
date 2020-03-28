import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import { connect } from 'react-redux';
import { fetchPeriodicScoreboards } from '../../redux/scoreboards/actions/fetchPeriodicScoreboardsActions';

export class OneYearDashboardComponent extends Component {
  componentDidMount() {
    this.props.fetchPeriodicScoreboards(
      '1year',
      this.props.authenticateUserData.authenticateUser.userInformation
        .department.id
    );
  }

  render() {
    // Retrieve the current logged in user department
    const { scoreboards, isLoading } = this.props.scoreboardsData;
    // console.log(scoreboards);

    if (isLoading) {
      return <div className="spinner-border mt-3"></div>;
    }

    let clonedDepartmentScoreboards = cloneDeep(
      isArray(scoreboards) ? scoreboards : null
    );

    // CALCULATION FOR ONE YEAR PERFORMANCE

    // Store all the department employees here
    let employeesInDepartment = [];

    const deptScoreboards = cloneDeep(clonedDepartmentScoreboards);

    deptScoreboards.forEach((sb, index) => {
      if (index === 0) employeesInDepartment.push(sb.user);

      let isPresent = false;
      employeesInDepartment.forEach(employee => {
        if (employee.id === sb.user.id) isPresent = true;
      });

      if (!isPresent) {
        employeesInDepartment.push(sb.user);
      }
    });

    let yearlyScoreboards = [];

    employeesInDepartment.forEach((employee, eIndex) => {
      //Retrieve all scoreboards for a specific employee
      const employeeScoreboards = deptScoreboards.filter(
        sb => sb.user.id === employee.id
      );

      // Store all the KPIs for a specific employee here
      let employeeKPIs = [];
      employeeScoreboards.forEach(
        (employeeScoreboard, employeeScoreboardIndex) => {
          employeeScoreboard.kpis.forEach((kpi, kpiIndex) => {
            if (employeeKPIs.length === 0) employeeKPIs.push(kpi);

            let isPresent = false;
            employeeKPIs.forEach(employeeKPI => {
              if (employeeKPI.id === kpi.id) isPresent = true;
            });

            if (!isPresent) employeeKPIs.push(kpi);
          });
        }
      );

      // Calculate the average employee KPI weights and scores one by one
      employeeKPIs.forEach((employeeKPI, employeeKPIIndex) => {
        let employeeKPIScores = [];
        let employeeKPIWeights = [];
        employeeScoreboards.forEach(
          (employeeScoreboard, employeeScoreboardIndex) => {
            employeeScoreboard.kpis.forEach((kpi, kpiIndex) => {
              if (kpi.id === employeeKPI.id) {
                employeeKPIScores.push(kpi.kPIScoreBoard.KPIScore);
                employeeKPIWeights.push(kpi.kPIScoreBoard.KPIWeight);
              }
            });
          }
        );

        // Calculate the average of KPI score and weight
        let totalScores = 0;
        employeeKPIScores.forEach(score => {
          totalScores += score;
        });
        const averageScore = totalScores / employeeKPIScores.length;

        let totalWeights = 0;
        employeeKPIWeights.forEach(weight => {
          totalWeights += weight;
        });
        const averageWeight = totalWeights / employeeKPIWeights.length;

        employeeKPIs[employeeKPIIndex].kPIScoreBoard.KPIWeight = averageWeight;
        employeeKPIs[employeeKPIIndex].kPIScoreBoard.KPIScore = averageScore;
      });

      // Add this altered yearly scoreboard to the array
      let yearlyEmployeeScoreboard = employeeScoreboards[0];
      yearlyEmployeeScoreboard.kpis = employeeKPIs;

      yearlyScoreboards.push(yearlyEmployeeScoreboard);
    });

    // Calculating cummulatibe average
    let averageScoresList = [];

    // Push al the average score
    if (yearlyScoreboards !== null)
      yearlyScoreboards.forEach((scoreboard, index) => {
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

    // Calculating the score for a department
    let totalAverageScoreList = 0;
    let departmentScore = 0;

    if (!isEmpty(averageScoresList)) {
      averageScoresList.forEach(as => {
        totalAverageScoreList += as;
      });

      departmentScore = totalAverageScoreList / averageScoresList.length;
    }

    // Create the page
    const departmentScoreboards = yearlyScoreboards
      ? yearlyScoreboards.map((scoreboard, index) => {
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

          // Considering scores for each month
          const kpiTitles = scoreboard.kpis.map(kpi => {
            return <td key={kpi.id}>{kpi.title}</td>;
          });

          const standardMeasures = scoreboard.kpis.map(kpi => {
            return <td key={kpi.id}>100 %</td>;
          });
          const kpiScores = scoreboard.kpis.map(kpi => {
            const score =
              kpi.kPIScoreBoard.KPIScore != null
                ? kpi.kPIScoreBoard.KPIScore
                : 0;

            let style = null;
            if (score < 50)
              style = {
                backgroundColor: '#cc6600'
              };
            else if (score < 60)
              style = {
                backgroundColor: '#ffcccc'
              };
            else if (score < 75)
              style = {
                backgroundColor: '#ffd11a'
              };
            else if (score < 90)
              style = {
                backgroundColor: '#4dd2ff'
              };
            else
              style = {
                backgroundColor: '#00cc44'
              };

            return (
              <td style={style} key={kpi.id}>
                {score}
              </td>
            );
          });

          // KPI Weights
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
                <td>{scoreboard.user.username}</td>
                <td>
                  <table className="container">
                    <tbody>
                      <tr>
                        <th>Title</th>
                        {kpiTitles}
                      </tr>
                      <tr>
                        <th>Standard Measure</th>
                        {standardMeasures}
                      </tr>
                      <tr>
                        <th>Weighted</th>
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
              </tr>
            </React.Fragment>
          );
        })
      : null;

    return (
      <div className="my-3">
        <div className="spin-loader"></div>
        <h3 className="mb-2">
          {isLoading ? <div className="spinner-border"></div> : ''}
        </h3>

        <div className="mb-2 row h5">
          {/* Show the performance of the department */}
          <div className="text-left col-sm-6">
            <label className="mr-sm-2">This Year Department's Score</label>
            {departmentScore.toFixed(1)} %
          </div>

          {/* Show which department employees to be displayed on the page */}
          <div className="text-right col-sm-6"></div>
        </div>

        <table
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
          id="employees-table"
          // ref={el => (this.el = el)}
        >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th className="text-center" scope="col">
                KPIs
              </th>
              <th>Yearly Score</th>
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
    fetchPeriodicScoreboards
  }
)(OneYearDashboardComponent);
