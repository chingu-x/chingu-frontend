import * as React from "react";
import BackBtn from '../BackBtn';
import { DynamicFormContainer, dynamicFormMaker } from "../../../DynamicForm";
import { gql } from "apollo-boost";
import { client } from "../../../../";
import { TeamHelpBaseQA, InactivityQA, ContextQA } from './TeamHelpQA';

class TeamHelp extends React.Component {
  constructor (props) {
    super(props);

    const persistedData = localStorage.getItem("team-help-request");

    // sets the questions based on persisted data from DFContainer
    let requestSubtype = null;
    if (persistedData) {
      const { form_data: { request_subtype } } = JSON.parse(persistedData);
      requestSubtype = request_subtype;
    }

    this.state = {
      error: null,
      response: null,
      questions: this.getQuestions(requestSubtype),
    }
  }

  getQuestions = (subtype) => {
    switch (subtype) {
      case 'inactivity':
        return [...TeamHelpBaseQA, ...InactivityQA, ContextQA];
      default:
        return [...TeamHelpBaseQA, ContextQA];
    }
  };

  // passed as prop to DFContainer
  // provides access to the request_subtype value when it changes
  handleInputChange = (fieldName, value, formData) => {
    if (fieldName !== 'request_subtype') return;

    // use request_subtype value (on change) to determine rendered questions
    const questions = this.getQuestions(value);
    this.setState({ questions });
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
    const { setResponse, switchHelpType } = this.props;
    const { error, response, questions } = this.state;
    
    if (error) return switchHelpType('error');
    if (response) return setResponse(response);

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
          <BackBtn path={"help-options"} switchHelpType={switchHelpType} />
        </div>
      </div>
    )
  }
}

export default TeamHelp;