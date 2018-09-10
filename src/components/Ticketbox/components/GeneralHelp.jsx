import * as React from "react";
import { QA } from './HelpOther.js';
import { DynamicFormContainer } from "../../DynamicForm";
import { gql } from "apollo-boost";
import { client } from "../../../index.js";
import BackBtn from './BackBtn';

class GeneralHelp extends React.Component {
  state = { error: null, response: null };

  handleResponse = ({ data }) => {
    window.localStorage.removeItem("ticketbox");
    this.setState({ response: data.feedbackCreate });
  }

  handleError = error => this.setState({ error });

  submitTicket = (feedback_data) => {
    const mutation = gql``;

    const variables = { feedback_data };
    client.mutate({ mutation, variables })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  render() {
    const { category, setResponse, switchHelpType } = this.props;
    const { error, response } = this.state;
    if (error) {
      switchHelpType('error');
    }
    if (response) {
      setResponse(response);
    }
    return (
      <div className="help-other-container">
        <div className="ticketbox-form">
          <DynamicFormContainer
            hiddenData={{ category }}
            questions={QA}
            onSubmit={this.submitTicket}
            persistence
            purpose="ticketbox"
          />
          <BackBtn path={"help-options"} switchHelpType={switchHelpType} />
        </div>
      </div>
    )
  }
}

export default GeneralHelp;