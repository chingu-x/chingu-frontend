import * as React from "react";
import { DynamicFormContainer } from "../../DynamicForm";
// import { Mutation } from "react-apollo";
// import { client } from "../../index.js";

const QA = (type) => {
  let bugSelected = type === 'bug';
  let returnedQA = [
    {
      text: 'Category',
      input_type: 'hidden',
      field_name: 'category',
      options: bugSelected ? 'bug' : 'suggestion'
    },
    {
      text: 'Type',
      input_type: 'dropdown',
      field_name: 'sub_category',
      options: bugSelected ? ['error', 'malfunction'] : ['existing', 'new']
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
  ]
  return returnedQA;
}


class BugSuggestion extends React.Component {
  submitTicket = () => {
    // mutation createFeedback(
    //   $feedback_data:FeedbackCreateInput!
    // ) {
    //   feedbackCreate(feedback_data:$feedback_data) {
    //     id
    //   }
    // }
    // mutation({
    //   variables: 
    // })
  }
  render() {
    console.log('in bugSuggestion')
    let { category } = this.props;
    let imgFile = category === 'bug' ? 'Artboard 3-small.png' : 'Artboard 2-small.png';
    let imgSrc = require(`../../../assets/${imgFile}`)
    return (
      <div className="bug-suggestion-box">
        <img className="box-icon" alt="icon" src={imgSrc} />
        <DynamicFormContainer
          hiddenData={category}
          questions={QA(category)}
          onSubmit={() => this.submitTicket()}
        />
      </div>
    )
  }
}

export default BugSuggestion;
