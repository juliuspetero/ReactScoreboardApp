import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import { connect } from 'react-redux';
import { fetchPeriodicScoreboards } from '../../redux/scoreboards/actions/fetchPeriodicScoreboardsActions';
import { fetchDepartments } from '../../redux/departments/actions/fetchDepartmentsActions';

export class SixMonthsDashboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentId: ''
    };
  }
  exportToPdf = () => {
    const input = document.getElementById('a6monthsDashboard');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      const doc = new jsPDF('p', 'mm');
      let position = 0;
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('6monthsDashboard.pdf');
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.fetchPeriodicScoreboards('6months', e.target.value);
  };

  componentDidMount() {
    this.props.fetchPeriodicScoreboards('6months', this.state.departmentId);
    this.props.fetchDepartments();
  }

  render() {
    // Find all the departments in the system and insert in the DOM
    const departmentsOptions = this.props.departmentsData.departments
      ? this.props.departmentsData.departments.map(department => (
          <option key={department.id} value={department.id}>
            {department.title}
          </option>
        ))
      : null;

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
                {score.toFixed(1)}
              </td>
            );
          });

          // KPI Weights
          const kpiWeights = scoreboard.kpis.map(kpi => {
            return (
              <td key={kpi.id}>
                {kpi.kPIScoreBoard.KPIWeight != null
                  ? kpi.kPIScoreBoard.KPIWeight.toFixed(1)
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
      <React.Fragment>
        {/* Dowlnload button */}
        <div className="text-left my-3">
          <button
            onClick={this.exportToPdf}
            id="exportButton"
            className="btn btn-lg btn-danger clearfix"
          >
            <span className="fa fa-file-pdf-o"></span> Export to PDF
          </button>
        </div>

        <div className="my-3" id="a6monthsDashboard">
          <div className="spin-loader"></div>
          <h3 className="mb-2">
            {isLoading ? <div className="spinner-border"></div> : ''}
            {this.props.departmentsData.departments
              ? this.props.departmentsData.departments.filter(
                  d => d.id === this.state.departmentId
                )[0]
                ? this.props.departmentsData.departments.filter(
                    d => d.id === this.state.departmentId
                  )[0].title
                : 'No Department Selected'
              : ''}
          </h3>

          <div className="mb-2 row h5">
            {/* Show the performance of the department */}
            <div className="text-left col-sm-6">
              <label className="mr-sm-2">
                Last Six Months Department's Score
              </label>
              {departmentScore.toFixed(1)} %
            </div>

            {/* Show which department employees to be displayed on the page */}
            <div className="text-right col-sm-6">
              <label className="mr-sm-2" htmlFor="number">
                Departments
              </label>
              <select
                onChange={this.onChange}
                name="departmentId"
                value={this.state.departmentId}
              >
                <option value="">Select Department</option>
                {departmentsOptions}
              </select>
            </div>
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
                <th>Half-yearly Score</th>
              </tr>
            </thead>
            <tbody>{departmentScoreboards}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  state => {
    return {
      scoreboardsData: state.fetchScoreboardsReducer,
      departmentsData: state.fetchDepartmentsReducer,
      authenticateUserData: state.authenticateUserReducer
    };
  },
  {
    fetchPeriodicScoreboards,
    fetchDepartments
  }
)(SixMonthsDashboardComponent);
