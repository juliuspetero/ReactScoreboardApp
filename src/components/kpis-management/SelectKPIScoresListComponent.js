import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { deleteCreateUserFlashMessage } from '../../redux/flashMessages/actions/createUserflashMessagesActions';
import SelectKPIScoresComponent from './SelectKPIScoresComponent';
import { deleteSelectKPI } from '../../redux/kpis/actions/selectKPIActions';

export class SelectKPIListComponent extends Component {
  // Delete all the  selected KPI when the component unmounts
  componentWillUnmount() {
    this.props.addSelectKPIData.forEach(selectKPIId => {
      this.props.deleteSelectKPI(selectKPIId);
    });
  }

  render() {
    // console.log(this.props.addSelectKPIData);
    const SelectKPIIds = this.props.addSelectKPIData.map(
      (selectKPIId, index) => (
        <SelectKPIScoresComponent
          key={selectKPIId}
          id={selectKPIId}
          onKPIChange={this.props.onKPIChange}
          selectedKPI={
            this.props.selectedKPIs ? this.props.selectedKPIs[index] : null
          }
        ></SelectKPIScoresComponent>
      )
    );
    return <div>{SelectKPIIds}</div>;
  }
}

export default connect(
  state => {
    return {
      addSelectKPIData: state.addSelectKPIReducer
    };
  },
  { deleteSelectKPI }
)(SelectKPIListComponent);
