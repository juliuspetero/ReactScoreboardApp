import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchKPIs } from '../../redux/kpis/actions/fetchKPIsActions';

export class SelectKPIScoresComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      KPIId: '',
      KPIScore: ''
    };
  }

  // Make state check to prevent double calls
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) this.props.onKPIChange(this.state);
  }

  componentDidMount() {
    // console.log(this.props.selectedKPI);
    this.setState({
      id: this.props.id,
      KPIId: this.props.selectedKPI ? this.props.selectedKPI.id : '',
      KPIScore: this.props.selectedKPI
        ? this.props.selectedKPI.kPIScoreBoards.KPIScore
        : ''
    });
    this.props.fetchKPIs();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const KPI = this.props.kpisData
      ? this.props.kpisData.kpis.filter(kpi => kpi.id === this.state.KPIId)[0]
      : null;

    // console.log(kpiTitle);

    return (
      <div>
        {/* SELECT KPI*/}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-building"></i>
            </span>
          </div>

          <input
            disabled
            name="KPIID"
            value={KPI ? KPI.title : ''}
            className="form-control mr-3"
          ></input>

          <input
            disabled
            name="description"
            className="form-control mr-3"
            value={KPI ? KPI.description : ''}
          ></input>

          <input
            onChange={this.onChange}
            name="KPIScore"
            className="form-control"
            type="number"
            value={this.state.KPIScore}
          />
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
)(SelectKPIScoresComponent);
