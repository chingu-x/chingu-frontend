import * as React from "react";
import { DynamicFormContainer } from "../../DynamicForm";
import { gql } from "apollo-boost";
import { client } from "../../../";

const QA = (category) => [
  {
    text: 'Category',
    input_type: 'hidden',
    field_name: 'category',
  },
  {
    text: 'Type',
    input_type: 'dropdown', // TODO: "button_option" new Question input_type?
    field_name: 'sub_category',
    options: category === 'bug'
      ? ['error', 'malfunction'] // bug category
      : ['existing', 'new'] // suggestion category
  },
  {
    text: 'Site Feature',
    input_type: 'dropdown',
    field_name: 'site_location',
    options: [
      'FAQ',
      'landing',
      'login',
      'newsfeed_all',
      'newsfeed_team',
      'other',
      'profile',
      'project',
      'project_showcase',
      'registration',
      'team_standup',
      'ticketbox',
      'voyages',
      'voyage_application'
    ]
  },
  {
    text: 'Title',
    input_type: 'text',
    field_name: 'title'
  },
  {
    text: 'Body',
    input_type: 'textarea',
    field_name: 'body'
  }
];

// TODO: styling for Success message?
// should be own file if used in other parts of ticketbox system
const Success = ({ category, url }) => (
  <div className="ticketbox-success">
    Success!
    <br />
    <a href={url} target="_blank">{`View ${category} Issue on Github`}</a>
  </div>
);

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
    const { category } = this.props;
    const { error, response } = this.state;
    const imgFile = category === 'bug' ? 'Artboard 3-small.png' : 'Artboard 2-small.png';
    const imgSrc = require(`../../../assets/${imgFile}`);

    if (error) {
      // TODO: best way to display error? Error component is too heavy
      return (
        <div className="bug-suggestion-box">
          <div className={`box-color color--${category}`}>
            <img className="box-icon" alt="icon" src={imgSrc} />
          </div>
          <div className="ticketbox-success">
            An Error Has Occured:
            <br />
            <div className="ticketbox-error-msg">
            {error}
            </div>
            <input
                  type="button"
                  value="BACK"
                  className="form-error-back-btn"
                  onClick={() => this.props.switchRenderedType('')}
                />
          </div>
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
                  purpose="ticketbox"
                />
                <input
                  type="button"
                  value="BACK"
                  className="form-back-btn"
                  onClick={() => this.props.switchRenderedType('')}
                />
              </div>
            )
        }
      </div>
    )
  }
}

export default BugSuggestion;
