import React from "react";
import { Redirect } from "react-router-dom";

import Error from "../Error";
import { client } from "../../";
import { DynamicForm } from "../DynamicForm";
import './TeamStandup.css';

import { gql } from "apollo-boost";

const submitStandupMutation = gql`
  mutation submitStandup(
    $team_id: ID!
    $standup_data: StandupSubmitInput!
  ) {
    standupSubmit(
      team_id: $team_id
      standup_data: $standup_data
    ) {
      id
      progress_sentiment
      worked_on
      working_on
      blocked_on
    }
  }
`;

class TeamStandup extends React.Component {
  state = {
    error: null,
    response: null,
  }

  handleResponse = ({ data }) => {
    window.localStorage.removeItem('team_standup');
    this.setState({ response: data.standupSubmit });
  }

  handleError = error => this.setState({ error });

  handleSubmit = ({ team_id, ...standup_data }) => {
    const variables = {
      team_id,
      standup_data,
    };

    client.mutate({
      mutation: submitStandupMutation,
      variables,
    }).then(this.handleResponse)
      .catch(this.handleError);
  }

  render() {
    const { team_id, standupVersion } = this.props;
    const { error, response } = this.state;

    if (error) return <Error error={error.message} />;
    if (response) return <Redirect to="/newsfeed" />;
    return (
      <div className="team-standup-container">
        <div className="team-standup-title">
          TEAM STANDUP
          </div>
        <div className="team-standup">
          <DynamicForm
            purpose="team_standup"
            version={standupVersion}
            hiddenData={{ team_id }}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default TeamStandup;
