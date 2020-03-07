import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import axios from 'axios';
import isArray from 'lodash/isArray';
import { connect } from 'react-redux';
import { fetchKPIs } from '../../redux/kpis/actions/fetchKPIsActions';
import DeleteButtonComponent from './DeleteButtonComponent';
import config from '../../config/config';

export class KPIsListComponent extends Component {
  componentDidMount() {
    this.props.fetchKPIs();
  }

  // Wipe the scoreboard out of memory
  deleteKPI = async id => {
    await axios.delete(`${config.baseUrl}/kpis/${id}`);
    this.props.fetchKPIs();
  };

  render() {
    // Retrieve all the KPIs in from the API
    const { kpis, isLoading } = this.props.kpisData;
    // console.log(kpis[0]);

    const clonedKPIs = cloneDeep(kpis);

    const kpi = clonedKPIs ? (clonedKPIs.length > 0 ? clonedKPIs[0] : {}) : {};
    delete kpi.id;
    delete kpi.updatedAt;

    const departmentId = this.props.authenticateUserData.authenticateUser
      .userInformation.departmentId;

    // Filter out only the KPIs for the managers department
    const filteredKPIList = isArray(kpis)
      ? kpis.filter(kpi => {
          if (kpi.departmentId === departmentId) return true;
          else if (departmentId === '3by786gk6s03j1h') return true;
          else return false;
        })
      : null;

    // List all the KPIs created
    const kpisList = filteredKPIList
      ? filteredKPIList.map((kpi, index) => {
          // const timeAgo = moment(kpi.createdAt).fromNow();
          return (
            <tr key={index}>
              <th scope="row">{kpi.title}</th>
              <td>{kpi.description}</td>
              <td>{kpi.department.title}</td>
              <td>
                <p>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.history.push(`/admin/edit-kpi/${kpi.id}`)
                    }
                    className="btn btn-light"
                  >
                    Edit
                  </button>
                </p>
                <p>
                  <DeleteButtonComponent kpi={kpi} deleteKPI={this.deleteKPI} />
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
          {isLoading ? <div className="spinner-border"></div> : ''} KPIs
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
              <th>Department</th>
              <th>Actions</th>
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
      kpisData: state.fetchKPIsReducer,
      authenticateUserData: state.authenticateUserReducer
    };
  },
  {
    fetchKPIs
  }
)(KPIsListComponent);
