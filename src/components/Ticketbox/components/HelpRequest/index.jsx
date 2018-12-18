import React from 'react';
import Select from 'react-select';
import { gql } from 'apollo-boost';

import questions from './questions';
import { client } from '../../../../index'
import { DynamicFormContainer } from '../../../DynamicForm';

const createHelpRequestMutation = gql`
  mutation createHelpRequestMutation($help_request_data: HelpRequestData!) {
    createHelpRequest(help_request_data: $help_request_data) {
      id
    }
  }
`;

// todo: refactor to export with Request
// use data to limit HR options
const projectHelpRequestQuery = gql`
  query projectHelpRequestQuery {
    user {
      id
      active_cohort_project {
        id
        members {
          id
          username
        }
      }

      cohorts(filters: { only_ongoing: true }) {
        id
        projects {
          id
          title
          tier {
            level
          }
        }
      }
    }
  }
`;

class HelpRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { request_type: 'general' };
  }

  fetchProjectRequestData = async () => {
    const { data: { user } } = await client.query({ query: projectHelpRequestQuery })
      .catch(console.error); 

      const {
        cohorts,
        active_cohort_project: { id: project_id, members: projectMembers },
      } = user;

      const [{ projects: cohortProjects }] = cohorts;

      return { project_id, projectMembers, cohortProjects };
  }

  changeRequestType = async (request_type) => {
    if (request_type !== 'general' && !this.state.project_id) {
      const data = await this.fetchProjectRequestData();
      return this.setState({ request_type, ...data });
    }

    return this.setState({ request_type });
  }

  shapeProjectData = (formData) => {
    const { project_id, request_type } = this.state;
    const { context, ...projectData } = formData;
    if (projectData.requested_project_id === 'auto-placement') {
      projectData.requested_project_id = null;
    }
    return { ...projectData, request_type, project_id };
  };

  handleSubmit = (formData) => {
    const { request_type } = this.state;
    const help_request_data = { context: formData.context };

    if (request_type !== 'general') {
      help_request_data.project_request_data = this.shapeProjectData(formData);
    }

    client.mutate({ mutation: createHelpRequestMutation, variables: { help_request_data } })
    .then(console.log)
    .catch(console.log);
    // todo: implement handlers
      // .then(this.handleSuccess)
      // .catch(this.handleError);
  }

  renderBaseForm = () => {
    // todo: limit options based on user in active cohort
    // REQUEST OPTIONS: change here
    const REQUEST_TYPES = ['general', 'inactivity', 'change_project'];
    const { request_type } = this.state;
    
    return (
      <Select
        escapeClearsValue={true}
        isSearchable={true}
        defaultValue="general"
        name="request_type"
        options={REQUEST_TYPES.map(type => ({ label: type, value: type }))}
        // value={request_type}
        value={{ label: request_type, value: request_type }}
        onChange={
          (target) => {
            const value = target.value;
            return this.changeRequestType(value);
          }
        }
      />
    );
  }

  render() {
    const { request_type } = this.state;
    const requestQuestions = questions[request_type](this.state);
    return (
      <div className="bug-suggestion-box">
        {this.renderBaseForm()}
        <DynamicFormContainer
          onSubmit={this.handleSubmit}
          questions={requestQuestions}
        />
      </div>
    );
  }
}

export default HelpRequest;
