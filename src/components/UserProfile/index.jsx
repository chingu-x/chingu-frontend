import React, { Fragment } from "react";
import UserSideBar from "./UserSideBar";
import Request from "../utilities/Request"
import profileQuery from "./graphql/profileQuery"
import './UserProfile.css'
import PendingApproval from './ProjectCards/PendingVoyages';
import ProjectCards from './ProjectCards/ProjectCards';


// -- USER PROFILE (EXPORT) -- //
const UserProfile = ({ data, match }) => {
  // Only allow editing if no /profile param provided. TODO: Check for currently logged in user
  const editable = !match.params.username

  const { user, user: { cohorts, projects } } = data; // Fetched user
  // const pastTeams = projects.filter(team => team.cohort.status === 'ended');
  // const currentTeams = projects.filter(team => team.cohort.status === 'ongoing');
  const pendingApproval = cohorts.filter(cohort =>
    cohort.members.some(member => member.member_status !== "applicant"),
  );

  return (
    <div className="user-profile-background-color">
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
            {!!projects.length && <div className="user-voyage-title">Current Projects</div>}
            <ProjectCards projectsList={projects} />
            {/* {!!pastTeams.length && <div className="user-voyage-title">Past Projects</div>}
            <ProjectCards teamsList={pastTeams} /> */}
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
