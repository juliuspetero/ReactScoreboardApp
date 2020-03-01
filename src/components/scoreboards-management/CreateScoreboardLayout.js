import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateScoreboardErrorMessage from '../messages/CreateScoreboardErrorMessage';
import { addSelectKPI } from '../../redux/kpis/actions/selectKPIActions';
import { createScoreboard } from '../../redux/scoreboards/actions/createScoreboardActions';
import SelectKPIListComponent from '../kpis-management/SelectKPIsListComponent';
import cloneDeep from 'lodash/cloneDeep';
import { fetchUser } from '../../redux/users/actions/fetchUserActions';
import { deleteCreateScoreboardErrorMessage } from '../../redux/errorMessages/actions/errorMessagesActions';
import { addCreateScoreboardFlashMessage } from '../../redux/flashMessages/actions/createScoreboardFlashMessagesAction';

export class CreateScoreboardLayoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
      componentIds: [],
      KPIIds: [],
      KPIWeights: []
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  // Handle state change i.e. the query parameter
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle for creation of a resource on the API
  onSubmit = e => {
    e.preventDefault();
    this.props.createScoreboard({
      userId: this.state.userId,
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
    componentIds.splice(index, 1);
    KPIIds.splice(index, 1);
    KPIWeights.splice(index, 1);
    this.setState({
      componentIds,
      KPIIds,
      KPIWeights
    });
  };

  // Call flash messages on successful user creation
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { authenticateUser } = this.props.authenticateUserData;

    const roleId = authenticateUser.userInformation.roles[0].id;

    if (
      this.props.createScoreboardData.createScoreboard !==
        nextProps.createScoreboardData.createScoreboard &&
      nextProps.createScoreboardData.createScoreboard != null
    ) {
      this.props.addCreateScoreboardFlashMessage(
        nextProps.createScoreboardData.createScoreboard
      );

      this.props.history.push(
        `/${
          roleId === '3by786gk6s03iu3' ? 'manager' : 'admin'
        }/scoreboardlayout/${this.props.match.params.id}`
      );
    }
  }

  // Render the UI
  render() {
    // console.log(this.state);
    const { isLoading, errors } = this.props.createScoreboardData;
    const { user } = this.props.userData;
    console.log(user);

    const errorMessages = errors
      ? errors.data
        ? Object.keys(errors.data).map((key, index) => (
            <CreateScoreboardErrorMessage
              key={index}
              messageKey={key}
              messageValue={errors.data[key]}
              deleteCreateScoreboardErrorMessage={
                this.props.deleteCreateScoreboardErrorMessage
              }
            ></CreateScoreboardErrorMessage>
          ))
        : null
      : null;
    return (
      <React.Fragment>
        <div className="cardbg-light mx-auto">
          <article className="card-body mx-auto" style={{ width: 'auto' }}>
            <h4 className="card-title mt-3 text-center">
              Create {user ? user.username : 'an employee'}'s KPIs
            </h4>
            <div>{errorMessages}</div>
            <form onSubmit={this.onSubmit}>
              {/* The select list for the KPIs to go in the dashboard */}
              <SelectKPIListComponent
                onKPIChange={this.onKPIChange}
                onDeleteKPI={this.onDeleteKPI}
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
                    ' Create Scoreboard'
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
    createScoreboardData: state.createScoreboardReducer,
    authenticateUserData: state.authenticateUserReducer,
    userData: state.fetchUserReducer
  };
};

export default connect(mapStateToProps, {
  addSelectKPI,
  deleteCreateScoreboardErrorMessage,
  createScoreboard,
  fetchUser,
  addCreateScoreboardFlashMessage
})(CreateScoreboardLayoutComponent);
