import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import EditScoreboardErrorMessage from '../messages/EditScoreboardErrorMessage';
import { addSelectKPI } from '../../redux/kpis/actions/selectKPIActions';
import { editScoreboard } from '../../redux/scoreboards/actions/editScoreboardActions';
import SelectKPIListComponent from '../kpis-management/SelectKPIsListComponent';
import cloneDeep from 'lodash/cloneDeep';
import config from '../../config/config';
import { deleteEditScoreboardErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { addEditScoreboardFlashMessage } from '../../redux/flashMessages/actions/editScoreboardFlashMessagesActions';

export class EditScoreboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreboard: null,
      componentIds: [],
      KPIIds: [],
      KPIWeights: []
    };
  }

  // Clear the Redis

  // Fetch the user information from the server
  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    const res = await axios.get(
      `${config.baseUrl}/scoreboards/${this.props.match.params.id}`
    );
    const scoreboard = await res.data;
    this.setState({
      isLoading: false,
      scoreboard
    });

    // Add the KPIs in the select list for the user to begin with
    if (scoreboard) {
      scoreboard.kpis.forEach(kpi => {
        this.props.addSelectKPI();
      });
    }
  }

  // Handle state change i.e. the query parameter
  onChange = e => {
    this.loadSearchResults(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle for creation of a resource on the API
  onSubmit = e => {
    e.preventDefault();
    this.props.editScoreboard({
      scoreBoardId: this.state.scoreboard.id,
      KPIIds: this.state.KPIIds,
      KPIWeights: this.state.KPIWeights
    });
  };

  // Handle the KPIs to be added in the scoreboard
  onKPIChange = kpi => {
    const { componentIds, KPIIds, KPIWeights } = this.state;
    // Populate the state for initial values
    if (componentIds.length === 0) {
      this.setState({
        componentIds: [...componentIds, kpi.id],
        KPIIds: [...KPIIds, kpi.KPIId],
        KPIWeights: [...KPIWeights, kpi.KPIWeight]
      });
    } else {
      let count = 0;
      componentIds.forEach((componentId, index) => {
        // A new component is coming
        if (kpi.id !== componentId) count++;

        if (kpi.id === componentId) {
          // A component is to be updated
          const KPIIds = this.state.KPIIds;
          KPIIds[index] = kpi.KPIId;
          const KPIWeights = this.state.KPIWeights;
          KPIWeights[index] = kpi.KPIWeight;
          this.setState({
            KPIIds,
            KPIWeights
          });
        }
      });

      // There is no id which matches the incoming one
      if (count === componentIds.length) {
        this.setState({
          componentIds: [...componentIds, kpi.id],
          KPIIds: [...KPIIds, kpi.KPIId],
          KPIWeights: [...KPIWeights, kpi.KPIWeight]
        });
      }
    }
  };

  // Handle deleteKPI event
  onDeleteKPI = id => {
    const { componentIds, KPIIds, KPIWeights } = cloneDeep(this.state);
    const index = componentIds.indexOf(id);
    const KPIId = KPIIds[index];
    componentIds.splice(index, 1);
    KPIIds.splice(index, 1);
    KPIWeights.splice(index, 1);
    this.setState({
      componentIds,
      KPIIds,
      KPIWeights
    });

    // Delete the KPI state scoreboard
    const newKPIs = this.state.scoreboard.kpis.filter(kpi => kpi.id !== KPIId);
    let newScoreboardState = this.state.scoreboard;
    newScoreboardState.kpis = newKPIs;

    this.setState({
      scoreboard: newScoreboardState
    });
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.editScoreboardData.editScoreboard !==
        nextProps.editScoreboardData.editScoreboard &&
      nextProps.editScoreboardData.editScoreboard != null
    ) {
      this.props.addEditScoreboardFlashMessage(
        nextProps.editScoreboardData.editScoreboard
      );

      this.props.history.push(
        `/admin/all-scoreboards/${this.state.scoreboard.userId}`
      );
    }
  }

  // Render the UI
  render() {
    // console.log(this.state);
    const { isLoading, errors } = this.props.editScoreboardData;

    const errorMessages = errors
      ? errors.data
        ? Object.keys(errors.data).map((key, index) => (
            <EditScoreboardErrorMessage
              key={index}
              messageKey={key}
              messageValue={errors.data[key]}
              deleteEditScoreboardErrorMessage={
                this.props.deleteEditScoreboardErrorMessage
              }
            ></EditScoreboardErrorMessage>
          ))
        : null
      : null;
    return (
      <React.Fragment>
        <div className="cardbg-light mx-auto">
          <article className="card-body mx-auto" style={{ width: 'auto' }}>
            <h4 className="card-title mt-3 text-center">
              Edit{' '}
              {this.state.scoreboard
                ? this.state.scoreboard.user.username
                : null}
              's Scoreboard
            </h4>
            <div>{errorMessages}</div>
            <form onSubmit={this.onSubmit}>
              {/*searched employees is not here */}

              {/* The select list for the KPIs to go in the dashboard */}
              <SelectKPIListComponent
                onKPIChange={this.onKPIChange}
                onDeleteKPI={this.onDeleteKPI}
                selectedKPIs={
                  this.state.scoreboard ? this.state.scoreboard.kpis : null
                }
              />
              <div className="text-left">
                <button
                  type="button"
                  onClick={() => this.props.addSelectKPI()}
                  className="btn btn-light btn-outline-secondary mb-2"
                >
                  Add KPI
                </button>
              </div>

              {/* Submit button */}
              <div className="form-group">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  {isLoading ? (
                    <div>
                      <div className="spinner-border-sm"></div>
                      <div>Please Wait...</div>
                    </div>
                  ) : (
                    ' Edit Scoreboard'
                  )}
                </button>
              </div>
            </form>
          </article>
        </div>
      </React.Fragment>
    );
  }
}

// This maps application state from the store to this component
const mapStateToProps = state => {
  return {
    editScoreboardData: state.editScoreboardReducer
  };
};

export default connect(mapStateToProps, {
  addSelectKPI,
  deleteEditScoreboardErrorMessage,
  editScoreboard,
  addEditScoreboardFlashMessage
})(EditScoreboardComponent);
