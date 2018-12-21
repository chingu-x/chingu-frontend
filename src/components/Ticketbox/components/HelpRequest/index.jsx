import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { gql } from 'apollo-boost';

import questions from './questions';
import { client } from '../../../../index';
import BackBtn from '../BackBtn';
import TicketBoxError from '../TicketBoxError';
import { DynamicFormContainer } from '../../../DynamicForm';
import Request from "../../../utilities/Request"

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
    this.state = {
      request_type: 'general',
      error: null,
      request_options: ['general'],
    };
  }

  componentDidMount() {
    let { data: { user } } = this.props;
    if (user && user.active_cohort_project) {
      this.setState({ request_options: ['general', 'inactivity', 'change_project'] })
    }
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

  handleSuccess = () => this.props.switchRenderedType('requests');

  handleError = (error) => this.setState({ error });

  handleSubmit = (formData) => {
    const { request_type } = this.state;
    const help_request_data = { context: formData.context };

    if (request_type !== 'general') {
      help_request_data.project_request_data = this.shapeProjectData(formData);
    }

    client.mutate({ mutation: createHelpRequestMutation, variables: { help_request_data } })
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  renderBaseForm = () => {
    // todo: limit options based on user in active cohort
    // REQUEST OPTIONS: change here
    const { request_type, request_options } = this.state;
    
    return (
      <div className={`form-QA`}>
        <label className="form-question">
          Help Category
        </label>
        <Select
          escapeClearsValue={true}
          isSearchable={true}
          defaultValue="general"
          name="request_type"
          options={request_options.map(type => ({ label: type, value: type }))}
          // value={request_type}
          value={{ label: request_type, value: request_type }}
          onChange={
            (target) => {
              const value = target.value;
              return this.changeRequestType(value);
            }
          }
        />
      </div>
      
    );
  }

  render() {
    const { request_type, error } = this.state;
    const { switchRenderedType } = this.props;
    const requestQuestions = questions[request_type](this.state);
    const imgFile = 'Artboard 4-small.png';
    const imgSrc = require(`../../../../assets/${imgFile}`);
    if (error) return <TicketBoxError switchRenderedType={switchRenderedType} />;

    return (
      <div className="bug-suggestion-box">
        <div className={`box-color color--help`}>
          <img className="box-icon" alt="icon" src={imgSrc} />
        </div>
        <div className="ticketbox-form">
          {this.renderBaseForm()}
          <DynamicFormContainer
            onSubmit={this.handleSubmit}
            questions={requestQuestions}
          />
          <BackBtn type="left" path={""} switchRenderedType={switchRenderedType} />
        </div>
      </div>
    );
  }
}

HelpRequest.propTypes = {
  switchRenderedType: PropTypes.func,
};

export default props => (
  <Request
    {...props}
    component={HelpRequest}
    query={projectHelpRequestQuery}
    loader={true}
  />
);
