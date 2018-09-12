import * as React from "react";
import BackBtn from '../BackBtn';
import { gql } from "apollo-boost";
import { DynamicFormContainer } from "../../../DynamicForm";
import { client } from "../../../../";
import { TeamHelpBaseQA, InactivityQA, ContextQA } from './TeamHelpQA';

class TeamHelp extends React.Component {
  constructor(props) {
    super(props);

    const persistedData = localStorage.getItem("team-help-request");

    // sets the questions based on persisted data from DFContainer
    let requestSubtype = null;
    let chosenTeamID = null;
    if (persistedData) {
      const { form_data: { request_subtype, team_id } } = JSON.parse(persistedData);
      requestSubtype = request_subtype;
      chosenTeamID = team_id;
    }

    this.state = {
      error: null,
      response: {},
      requestSubtype,
      chosenTeamID,
      questions: this.getQuestions(requestSubtype, chosenTeamID),
    }
  }

  getQuestions = (requestSubtype, chosenTeamID) => {
    const userMock = {
      user: {
        id: 10,
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
      },
    };
    // TODO: replace with actual query
    // const { user, user: { teams } } = this.props;
    const { user, user: { teams } } = userMock;
    
    switch (requestSubtype) {
      case 'inactivity':
        return [
          ...TeamHelpBaseQA(teams),
          ...InactivityQA(user, chosenTeamID),
          ContextQA(requestSubtype),
        ];
      default:
        return [...TeamHelpBaseQA(teams), ContextQA(requestSubtype)];
    }
  };

  // passed as prop to DFContainer
  // provides access to the request_subtype value when it changes
  handleInputChange = (fieldName, value, formData) => {
    // ignore other field names
    if (!['request_subtype', 'team_id'].includes(fieldName)) return;

    // update values when DFContainer input changes
    let requestSubtype, chosenTeamID;
    if (fieldName === 'request_subtype') {
      // update the chosen value from form
      requestSubtype = value;
      // get the current value for teamID from form
        // handles initial case where teamID is initialized
        // in DFContainer but not reflected in TeamHelp
      chosenTeamID = formData.team_id;
    } else if (fieldName === 'team_id') {
      // change nothing
      requestSubtype = this.state.requestSubtype;
      // update teamID from input change value
      chosenTeamID = value;
    };

    const questions = this.getQuestions(requestSubtype, chosenTeamID);
    this.setState({ requestSubtype, chosenTeamID, questions });
  }

  handleResponse = ({ data }) => {
    window.localStorage.removeItem("team-help-request");
    this.setState({ response: data.teamHelpRequestCreate });
  }

  handleError = error => this.setState({ error });

  submitRequest = (form_data) => {
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

    const help_request_data = { ...form_data };
    
    // convert to unix timestamp before submitting
    if (form_data.last_contact) {
      const formattedDate = Number(new Date(form_data.last_contact));
      help_request_data.last_contact = formattedDate;
    }

    const variables = { help_request_data };
    client.mutate({ mutation, variables })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  render() {
    const { setResponse, switchHelpType } = this.props;
    const { error, response, questions } = this.state;

    if (error) switchHelpType('error');
    
    // TODO: setResponse is broken (should return a success component)
    if (response) switchHelpType('success');

    return (
      <div className="help-team-container">
        <div className="ticketbox-form">
          <DynamicFormContainer
            purpose="team-help-request"
            questions={questions}
            onSubmit={this.submitRequest}
            onInputChange={this.handleInputChange}
            persistence
          />
          <BackBtn path={"help-options"} type="left" switchHelpType={switchHelpType} />
        </div>
      </div>
    )
  }
}

export default TeamHelp