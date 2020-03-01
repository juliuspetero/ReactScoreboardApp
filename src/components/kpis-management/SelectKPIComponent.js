import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchKPIs } from '../../redux/kpis/actions/fetchKPIsActions';

export class SelectKPIComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      KPIId: '',
      KPIWeight: ''
    };
  }

  // Make state check to prevent double calls
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) this.props.onKPIChange(this.state);
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      KPIId: this.props.selectedKPI ? this.props.selectedKPI.id : '',
      KPIWeight: this.props.selectedKPI
        ? this.props.selectedKPI.kPIScoreboardLayouts.KPIWeight
        : ''
    });
    this.props.fetchKPIs();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Call the two delete methods from here
  onClick = e => {
    this.props.deleteSelectKPI(this.props.id);
    this.props.onDeleteKPI(this.props.id);
  };

  render() {
    const KPIsOptions = this.props.kpisData.kpis
      ? this.props.kpisData.kpis.map(kpi => (
          <option key={kpi.id} value={kpi.id}>
            {kpi.title}
          </option>
        ))
      : null;

    return (
      <div>
        {/* SELECT KPI*/}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-building"></i>
            </span>
          </div>
          <select
            onChange={this.onChange}
            value={this.state.KPIId}
            name="KPIId"
            className="form-control mr-3"
          >
            <option value="">Select KPI</option>
            {KPIsOptions}
          </select>
          <input
            onChange={this.onChange}
            name="KPIWeight"
            className="form-control"
            placeholder="KPI Weight from 0 - 10"
            type="number"
            value={this.state.KPIWeight}
          />
          <button onClick={this.onClick} className="close text-danger mx-2">
            <span>&times;</span>
          </button>
        </div>
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
)(SelectKPIComponent);
