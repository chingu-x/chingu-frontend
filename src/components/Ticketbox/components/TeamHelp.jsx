import * as React from "react";
import BackBtn from './BackBtn';
import { DynamicFormContainer, dynamicFormMaker } from "../../DynamicForm";
import { gql } from "apollo-boost";
import { client } from "../../..";
import { QA, TextQA, InactivityQA } from './TeamHelpQA';

class TeamHelp extends React.Component {
  state = { 
    error: null, 
    response: null,
    feedback_data: {}
  };

  onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    const feedback_data = { ...this.state.feedback_data };

    feedback_data[name] = value;

    this.setState({ feedback_data });
  }

  handleResponse = ({ data }) => {
    window.localStorage.removeItem("ticketbox");
    this.setState({ response: data.feedbackCreate });
  }

  handleError = error => this.setState({ error });

  submitTicket = () => {
    let { feedback_data } = this.state;
    const mutation = gql``;

    const variables = feedback_data;
    console.log(variables);
    client.mutate({ mutation, variables })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  render() {
    const { category, setResponse, switchHelpType } = this.props;
    const { error, response, feedback_data } = this.state;
    let questionType = feedback_data.request_subtype === 'inactivity' ? InactivityQA : TextQA;

    if (error) {
      switchHelpType('error');
    }
    if (response) {
      setResponse(response);
    }
    return (
      <div className="help-team-container">
        <div className="ticketbox-form">
          {dynamicFormMaker(QA, feedback_data, this.onChangeHandler)}
          {
            feedback_data.request_subtype
            && dynamicFormMaker(questionType, feedback_data, this.onChangeHandler)
          }
          <input
            type="submit"
            className="form-btn"
            value="Submit"
            onClick={() => this.submitTicket()}
          />
          {/* {
            feedback_data.request_subtype 
              && <DynamicFormContainer
                hiddenData={{ category }}
                questions={feedback_data.request_subtype === 'inactivity' ? InactivityQA : TextQA}
                onSubmit={this.submitTicket}
                persistence
                purpose="ticketbox"
              />
          }  */}
          <BackBtn path={"help-options"} switchHelpType={switchHelpType} />
        </div>
      </div>
    )
  }
}

export default TeamHelp;