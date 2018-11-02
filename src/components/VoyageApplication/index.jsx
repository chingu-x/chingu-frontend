import * as React from 'react';
import './VoyageApplication.css';
import { DynamicForm } from "../DynamicForm";
import Request from "../utilities/Request"
import { gql } from "apollo-boost";
import { Redirect } from "react-router-dom";

import { UserSkills } from "../UserProfile/components";

const VoyageApplicationUserQuery = gql`
  query VoyageApplicationUserQuery {
    user {
      id
      status
      acquired_skills {
        id
        name
        category
      }
      desired_skills {
        id
        name
        category
      }
      requested_skills {
        id
        name
      }
    }
  }
`;

const SkillUpdaters = ({ user, onContinue }) => {
  const title = "Update Your Skills";
  const subtext = ( 
    <div>
      <p>
        Below are your current Acquired and Desired Skills.
        We use these to optimize team formation.
      </p>
      <p>If you need to update your skills before applying to the Voyage use the inputs below.</p>
    </div>
  );

  const skillsForm = (
    <React.Fragment>
      <UserSkills user={user} editable={true} />
      <hr className="form-hline" />
      <div className="voyage-application-btn-container-single">
        <button className="voyage-appliation-btn--green-center" onClick={() => onContinue()}>
          Continue
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <VoyageApplicationContainer
      title={title}
      subtext={subtext}
      formComponent={skillsForm}
    />
  )
}

/**
 * refactor notes 8/11/18
 * 
 * apply to voyage button ->
 * render VoyageApplicationWrapper passing voyage_id
 * 
 * Flow
 *    status is  'voyage_ready' -> VoyageApplication query
 *      submitRedirect -> /profile
 *    status is 'profile_complete' -> NewVoyageUserApplication query
 *      submitRedirect -> /voyage/applicaton/${this.state.voyage_id}      
 *    status is 'profile_incomplete' -> Redirect /profile/update
 */
class VoyageApplicationWrapper extends React.Component {
  state = {
    displaySkillsUpdaters: true,
  }

  handleContinue = () => this.setState({ displaySkillsUpdaters: false });

  render() {
    const { displaySkillsUpdaters } = this.state;
    const {
      voyage_id,
      voyageVersion,
      newUserVersion,
      data: { user },
    } = this.props;

    if (displaySkillsUpdaters) return (
      <SkillUpdaters user={user} onContinue={this.handleContinue} />
    );
    
    switch (user.status) {
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

}

const VoyageApplicationContainer = ({ title, formComponent, subtext }) => (
  <div className="voyage-application-container">
    <div className="voyage-application-title">{title}</div>
    <div className="voyage-application-subtitle ">{subtext}</div>
    <div className="voyage-application">{formComponent}</div>
  </div>
);

const VoyageApplication = ({ version, voyage_id, newUser }) => {
  const handleResponse = (data) => {
    const redirectLocation = newUser
      ? `/voyage/application/${voyage_id}`
      : "/profile";

    return <Redirect to={redirectLocation} />;
  } 

  const voyageForm = (
    <DynamicForm
      version={version}
      purpose={newUser ? "new_voyage_user" : "voyage_application"}
      hiddenData={{ voyage_id }}
      onResponse={handleResponse}
    />
  );

  const title = newUser ? "New Voyage User Application" : "Voyage Application"

  return <VoyageApplicationContainer title={title} formComponent={voyageForm} />
}

export default props =>
  <Request
    {...props} 
    component={VoyageApplicationWrapper}
    query={VoyageApplicationUserQuery}
    options={{ fetchPolicy: "network-only" }}
    loader
  />
