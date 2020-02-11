import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchKPIs } from '../../redux/kpis/actions/fetchKPIsActions';

export class KPIsListComponent extends Component {
  componentDidMount() {
    this.props.fetchKPIs();
  }

  onRowClicked = kpi => {
    this.props.history.push(`${this.props.match.url}/${kpi.id}`);
  };

  render() {
    // Retrieve all the KPIs in from the API
    const { kpis, isLoading } = this.props.kpisData;
    console.log(kpis[0]);

    const kpi = kpis ? (kpis.length > 0 ? kpis[0] : {}) : {};
    delete kpi.id;
    delete kpi.updatedAt;

    // A function to capitalize a heading
    function capitalize(heading) {
      if (heading == null) return heading;
      return heading.charAt(0).toUpperCase() + heading.slice(1);
    }

    const columnHeaders = Object.keys(kpi).map((key, index) => (
      <th scope="col" key={index}>
        {capitalize(key)}
      </th>
    ));

    // List all the KPIs created
    const kpisList = cloneDeep(kpis).map(kpi => {
      const timeAgo = moment(kpi.createdAt).fromNow();
      return (
        <React.Fragment key={kpi.id}>
          <tr onClick={() => this.onRowClicked(kpi)}>
            <th scope="row">
              <Link to={`${this.props.match.url}/${kpi.id}`}>{kpi.title}</Link>
            </th>
            <td>{kpi.description}</td>
            <td className="date timeago" title={timeAgo}>
              {timeAgo}
            </td>
          </tr>
        </React.Fragment>
      );
    });
    return (
      <div className="my-3">
        <div className="spin-loader"></div>
        <h3 className="mb-2">
          {isLoading ? <div className="spinner-border"></div> : ''} All KPIs
        </h3>
        <table
          className="table table-striped table-bordered table-hover text-left"
          style={{ width: '100%' }}
          id="employees-table"
          // ref={el => (this.el = el)}
        >
          <thead>
            <tr>
              {columnHeaders}
              {/* <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Date Created</th> */}
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
      kpisData: state.fetchKPIsReducer
    };
  },
  {
    fetchKPIs
  }
)(KPIsListComponent);
