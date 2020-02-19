import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import EditScoresErrorMessage from '../messages/EditScoresErrorMessage';
import { addSelectKPI } from '../../redux/kpis/actions/selectKPIActions';
import { editScores } from '../../redux/scoreboards/actions/editScoresActions';
import SelectKPIScoresListComponent from '../kpis-management/SelectKPIScoresListComponent';
import config from '../../config/config';
import { deleteEditScoresErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { addEditScoresFlashMessage } from '../../redux/flashMessages/actions/editScoresFlashMessagesAction';

export class EditScoresComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreboard: null,
      componentIds: [],
      KPIIds: [],
      KPIScores: []
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
    this.props.editScores({
      scoreBoardId: this.state.scoreboard.id,
      KPIIds: this.state.KPIIds,
      KPIScores: this.state.KPIScores
    });
  };

  // Handle the KPIs to be added in the scoreboard
  onKPIChange = kpi => {
    const { componentIds, KPIIds, KPIScores } = this.state;
    // Populate the state for initial values
    if (componentIds.length === 0) {
      this.setState({
        componentIds: [...componentIds, kpi.id],
        KPIIds: [...KPIIds, kpi.KPIId],
        KPIScores: [...KPIScores, kpi.KPIScore]
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

          const KPIScores = this.state.KPIScores;
          KPIScores[index] = kpi.KPIScore;

          this.setState({
            KPIIds,
            KPIScores
          });
        }
      });

      // There is no id which matches the incoming one
      if (count === componentIds.length) {
        this.setState({
          componentIds: [...componentIds, kpi.id],
          KPIIds: [...KPIIds, kpi.KPIId],
          KPIScores: [...KPIScores, kpi.KPIScore]
        });
      }
    }
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.editScoresData.editScores !==
        nextProps.editScoresData.editScores &&
      nextProps.editScoresData.editScores != null
    ) {
      this.props.addEditScoresFlashMessage(nextProps.editScoresData.editScores);

      this.props.history.push(
        `/admin/all-scoreboards/${this.state.scoreboard.userId}`
      );
    }
  }

  // Render the UI
  render() {
    // console.log(this.state);
    const { isLoading, errors } = this.props.editScoresData;

    const errorMessages = errors
      ? errors.data
        ? Object.keys(errors.data).map((key, index) => (
            <EditScoresErrorMessage
              key={index}
              messageKey={key}
              messageValue={errors.data[key]}
              deleteEditScoresErrorMessage={
                this.props.deleteEditScoresErrorMessage
              }
            ></EditScoresErrorMessage>
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
              's KPI Scores
            </h4>
            <div>{errorMessages}</div>
            <form onSubmit={this.onSubmit}>
              {/*searched employees is not here */}

              {/* The select list for the KPIs to go in the dashboard */}
              <SelectKPIScoresListComponent
                onKPIChange={this.onKPIChange}
                onDeleteKPI={this.onDeleteKPI}
                selectedKPIs={
                  this.state.scoreboard ? this.state.scoreboard.kpis : null
                }
              />

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
                    ' Edit Scores'
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
    editScoresData: state.editScoresReducer
  };
};

export default connect(mapStateToProps, {
  addSelectKPI,
  deleteEditScoresErrorMessage,
  editScores,
  addEditScoresFlashMessage
})(EditScoresComponent);
