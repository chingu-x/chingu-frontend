import React, { Fragment } from "react";
import UserSideBar from "./UserSideBar";
import Request from "../utilities/Request"
import profileQuery from "./graphql/profileQuery"
import './UserProfile.css'
import CurrentVoyages from './ProjectCards/CurrentVoyages';
import NoTeamTypeCards from './ProjectCards/NoTeamTypeCards';
import PendingApproval from './ProjectCards/PendingVoyages';
import ProjectCards from './ProjectCards/ProjectCards';

// -- USER PROFILE (EXPORT) -- //
const UserProfile = props => {
  // Only allow editing if no /profile param provided. TODO: Check for currently logged in user
  console.log(props);
  const editable = !props.match.params.username
  console.log(props.data.user);

  /**
   * TODOS:
   * Check filters
   */
  const { user, user: { teams, cohorts, username } } = props.data // Fetched user
  const pastTeams = teams.filter(team => team.cohort.status === 'ended');
  const currentTeams = teams.filter(team => team.cohort.status === 'ongoing');
  const pendingApproval = cohorts.filter(cohort =>
    cohort.members.some(member =>
      member.user.username === username && member.status === "pending_approval"
    ))

  return (
    < div className="user-profile-background-color" >
      <div className="user-profile-container">
        <aside className="user-profile">
          <UserSideBar editable={editable} user={user} />
        </aside>

        <main className="user-voyages">

          <section className="user-voyage">
            {
              pendingApproval.length > 0
              && <PendingApproval pendingApproval={pendingApproval} />
            }
          </section>

          <section className="user-voyage">
            {!!currentTeams.length && <div className="user-voyage-title">Current Projects</div>}
            <ProjectCards teamsList={currentTeams} />
            {!!pastTeams.length && <div className="user-voyage-title">Past Projects</div>}
            <ProjectCards teamsList={pastTeams} />
          </section>

        </main>
      </div>
    </div >
  )
}

export default props =>
  <Request
    {...props}
    query={profileQuery}
    variables={{ username: props.match.params.username }}
    component={UserProfile}
    loader
  />
