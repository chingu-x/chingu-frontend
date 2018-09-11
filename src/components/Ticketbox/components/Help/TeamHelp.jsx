import * as React from "react";
import BackBtn from '../BackBtn';
import { gql } from "apollo-boost";
import { DynamicFormContainer, dynamicFormMaker } from "../../../DynamicForm";
import { client } from "../../../../";
import Request from "../../../utilities/Request"
import Loader from "../../../Loader"
import { TeamHelpBaseQA, InactivityQA, ContextQA } from './TeamHelpQA';

const userActiveTeamsQuery = gql`
 query getUserActiveTeams {
  user {
    id
    teams(only_active: true) {
      id
      title
      project { 
        id
        title
      }
      cohort_users {
        user {
          id
          username
          avatar
        }
      }
    }
  }
 }
`
class TeamHelp extends React.Component {
  constructor(props) {
    super(props);

    const persistedData = localStorage.getItem("team-help-request");

    // sets the questions based on persisted data from DFContainer
    let requestSubtype = null;
    let teamID = null;
    if (persistedData) {
      const { form_data: { request_subtype, team_id } } = JSON.parse(persistedData);
      requestSubtype = request_subtype;
      teamID = team_id;
    }

    this.state = {
      error: null,
      response: null,
      requestSubtype,
      teamID,
    }
  }

  getQuestions = (subtype, teams, teamID, currentUserID) => {
    switch (subtype) {
      case 'inactivity':
        return [
          ...TeamHelpBaseQA(teams),
          ...InactivityQA(teams, teamID, currentUserID),
          ContextQA,
        ];
      default:
        return [...TeamHelpBaseQA(teams), ContextQA];
    }
  };

  // passed as prop to DFContainer
  // provides access to the request_subtype value when it changes
  handleInputChange = (fieldName, value) => {
    // ignore other field names
    if (!['request_subtype', 'team_id'].includes(fieldName)) return;

    // update values when DFContainer input changes
    if (fieldName === 'request_subtype') {
      this.setState({ requestSubtype: value });
    } else if (fieldName === 'team_id') {
      this.setState({ teamID: value });
    };
  }

  handleResponse = ({ data }) => {
    window.localStorage.removeItem("team-help-request");
    this.setState({ response: data.teamHelpRequestCreate });
  }

  handleError = error => this.setState({ error });

  submitRequest = (help_request_data) => {
    const mutation = gql`
      mutation submitTeamHelpRequest(
        $help_request_data: TeamHelpRequestCreateInput!
      ) {
        teamHelpRequestCreate(
          help_request_data: $help_request_data
        ) {
          id
        }
      }
    `;

    const variables = { help_request_data };
    client.mutate({ mutation, variables })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  render() {
    const { setResponse, switchHelpType, loading, data: { user } } = this.props;
    const { error, response, requestSubtype, teamID } = this.state;

    if (error) return switchHelpType('error');
    if (response) return setResponse(response);

    // TODO: remove once querying for actual user
    const userMock = {
      teams: [
        {
          id: 1,
          title: "Vampires Team 0",
          project: {
            id: 1,
            title: "Chingu API",
          },
          cohort_users: [
            {
              user: {
                id: 1,
                username: "the-vampiire",
                avatar: "https://avatars2.githubusercontent.com/u/25523682?s=88&v=4",
              }
            },
            {
              user: {
                id: 2,
                username: "thinktwice13",
                avatar: "https://avatars2.githubusercontent.com/u/25523682?s=88&v=4",
              }
            },
          ],
        },
        {
          id: 2,
          title: "Werewolves Team 0",
          project: {
            id: 2,
            title: "Chingu Frontend",
          },
          cohort_users: [
            {
              user: {
                id: 3,
                username: "serpient",
                avatar: "https://avatars2.githubusercontent.com/u/25523682?s=88&v=4",
              }
            },
            {
              user: {
                id: 1,
                username: "the-vampiire",
                avatar: "https://avatars2.githubusercontent.com/u/25523682?s=88&v=4",
              }
            },
          ]
        },
      ],
    };

    // TODO: replace with user when querying for actual user
    const questions = this.getQuestions(requestSubtype, userMock.teams, teamID, user.id);
    return (
      <div className="help-team-container">
        <div className="ticketbox-form">
          {
            loading
              ? <Loader size="medium" height="478.6px" color="#E20000" />
              : <DynamicFormContainer
                purpose="team-help-request"
                questions={questions}
                onSubmit={this.submitRequest}
                onInputChange={this.handleInputChange}
                persistence
              />
          }
          <BackBtn path={"help-options"} type="left" switchHelpType={switchHelpType} />
        </div>
      </div>
    )
  }
}

// export default TeamHelp
export default props =>
  <Request
    {...props}
    query={userActiveTeamsQuery}
    component={TeamHelp}
  />

