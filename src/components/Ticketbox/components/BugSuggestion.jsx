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
    options: category ===  'bug'
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
const Success = ({ url }) => (
  <React.Fragment>
    Success! <a href={url} target="_blank">View feedback Issue on Github</a>
  </React.Fragment>
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
    client.mutate({  mutation, variables })
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
    }

    return (
      <div className="bug-suggestion-box">
        <img className="box-icon" alt="icon" src={imgSrc} />
        { 
          response
            ? <Success url={response.github_issue.url} />
            : (
                <DynamicFormContainer
                  hiddenData={{ category }}
                  questions={QA(category)}
                  onSubmit={this.submitTicket}
                  persistence
                  purpose="ticketbox"
                />
            )
        }
      </div>
    )
  }
}

export default BugSuggestion;
