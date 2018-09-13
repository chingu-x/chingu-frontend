import * as React from "react";
import { DynamicFormContainer } from "../../../DynamicForm";
import { gql } from "apollo-boost";
import { client } from "../../../../";
import { QA } from './BugSuggestionQA';
import Success from '../Success';
import TicketBoxError from '../TicketBoxError';
import BackBtn from '../BackBtn';

class BugSuggestion extends React.Component {
  state = { error: null, response: null };

  handleResponse = ({ data }) => {
    window.localStorage.removeItem("ticketbox");
    this.setState({ response: data.feedbackCreate });
  }

  handleError = error => this.setState({ error });

  submitTicket = (feedback_data) => {
    const mutation = gql`
      mutation createFeedback(
          $feedback_data:FeedbackCreateInput!
        ) {
          feedbackCreate(feedback_data:$feedback_data) {
            id
            github_issue { url }
          }
        }
    `;

    const variables = { feedback_data };
    client.mutate({ mutation, variables })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  render() {
    const { category, switchRenderedType } = this.props;
    const { error, response } = this.state;
    const imgFile = category === 'bug' ? 'Artboard 3-small.png' : 'Artboard 2-small.png';
    const imgSrc = require(`../../../../assets/${imgFile}`);

    if (error) {
      return (
        <div className="bug-suggestion-box">
          <div className={`box-color color--${category}`}>
            <img className="box-icon" alt="icon" src={imgSrc} />
          </div>
          <TicketBoxError
            switchRenderedType={switchRenderedType}
          />
        </div>
      )
    }

    return (
      <div className="bug-suggestion-box">
        <div className={`box-color color--${category}`}>
          <img className="box-icon" alt="icon" src={imgSrc} />
        </div>
        {
          response
            ? <Success category={category} url={response.github_issue.url} />
            : (
              <div className="ticketbox-form">
                <DynamicFormContainer
                  hiddenData={{ category }}
                  questions={QA(category)}
                  onSubmit={this.submitTicket}
                  persistence
                  purpose={`ticketbox-${category}`}
                />
                <BackBtn type="left" path={""} switchRenderedType={switchRenderedType} />
              </div>
            )
        }
      </div>
    )
  }
}

export default BugSuggestion;
