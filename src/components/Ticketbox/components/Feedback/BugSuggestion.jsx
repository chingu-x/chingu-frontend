import * as React from "react";
import PropTypes from "prop-types"
import { DynamicFormContainer } from "../../../DynamicForm";
import { gql } from "apollo-boost";
import { client } from "../../../../";
import { QA } from "./BugSuggestionQA";
import Success from "../Success";
import TicketBoxError from "../TicketBoxError";
import BackBtn from "../BackBtn";
import { introspectEnum, Request } from "../../../utilities";

class BugSuggestion extends React.Component {
  state = { error: null, response: null };

  handleResponse = ({ data }) => {
    const { category } = this.props;
    window.localStorage.removeItem(`ticketbox-${category}`);
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
    const { category, switchRenderedType, data: { siteLocationsEnum } } = this.props;
    const { error, response } = this.state;
    const imgFile = category === 'bug' ? 'Artboard 3-small.png' : 'Artboard 2-small.png';
    const imgSrc = require(`../../../../assets/${imgFile}`);

    let component;
    if (error) component = <TicketBoxError switchRenderedType={switchRenderedType} />;
    else if (response) component = <Success category={category} url={response.github_issue.url} />;
    else component = (
      <div className="ticketbox-form">
        <DynamicFormContainer
          hiddenData={{ category }}
          questions={QA(category, siteLocationsEnum.options)}
          onSubmit={this.submitTicket}
          persistence
          purpose={`ticketbox-${category}`}
        />
        <BackBtn type="left" path={""} switchRenderedType={switchRenderedType} />
      </div>
    );

    return (
      <div className="bug-suggestion-box">
        <div className={`box-color color--${category}`}>
          <img className="box-icon" alt="icon" src={imgSrc} />
        </div>
        {component}
      </div>
    )
  }
}

BugSuggestion.propTypes = {
  category: PropTypes.string.isRequired,
  switchRenderedType: PropTypes.func.isRequired,
}

const siteLocationEnumQuery = introspectEnum(
  'UserFeedbackSiteLocationEnum',
  'siteLocationsEnum',
  'BugSuggestionSiteLocationsEnumQuery',
);

export default props => (
  <Request
    {...props}
    query={siteLocationEnumQuery}
    component={BugSuggestion}
    loader
  />
);
