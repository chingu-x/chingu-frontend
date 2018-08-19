// TODO: refactor with dynamic form
import * as React from 'react';
import './VoyageApplication.css';
import DynamicForm from "../DynamicForm";
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

const VoyageApplicationUserQuery = gql`
  query VoyageApplicationUserQuery {
    user {
      id
      status
    }
  }
`;

/**
 * refactor notes 8/11/18
 * 
 * apply to voyage button ->
 * render VoyageApplicationContainer passing voyage_id
 * 
 * Flow
 *    status is  'voyage_ready' -> VoyageApplication query
 *      submitRedirect -> /profile
 *    status is 'profile_complete' -> NewVoyageUserApplication query
 *      submitRedirect -> /voyage/applicaton/${this.state.voyage_id}      
 *    status is 'profile_incomplete' -> Redirect /profile/update
 */
const VoyageApplicationContainer = (
  { voyage_id, voyageVersion, newUserVersion },
) => {
  this.redirectSwitch = (status) => {
    switch (status) {
      case 'voyage_ready':
        return (
          <VoyageApplication
            version={voyageVersion}
            voyage_id={voyage_id}
          />
        );
      case 'profile_complete':
        return (
          <VoyageApplication
            version={newUserVersion}
            voyage_id={voyage_id}
            newUser
          />
        );
      case 'profile_incomplete':
        return <Redirect to={"/profile/update"} />;
      default:
        return <Redirect to={"/voyage"} />;
    }
  }

  return (
    <Query query={VoyageApplicationUserQuery} >
      {
        ({ data, loading, error }) => {
          if (loading) return <Loader />;
          if (error) return <Error error={error.message} />;

          const { user: { status } } = data;
          return this.redirectSwitch(status);
        }
      }
    </Query>
  );
}

const VoyageApplication = ({ version, voyage_id, newUser }) => (
  <div className="voyage-application-container">
    <div className="voyage-application-title">
      {newUser ? "New Voyage User Application" : "Voyage Application"}
    </div>
    <div className="voyage-application">
      <DynamicForm
        version={version}
        purpose={newUser ? "new_voyage_user" : "voyage_application"}
        hiddenData={{ voyage_id }}
        submitRedirect={newUser ? `/voyage/application/${voyage_id}` : null}
      />
    </div>
  </div>
);

export default VoyageApplicationContainer;
