import * as React from "react";
import * as Cards from "../VoyageCard/VoyageCard";
import UserSideBar from "./UserSideBar";
import Request from "../utilities/Request"
import profileQuery from "./graphql/profileQuery"
import './UserProfile.css'

const UserProfile = ({ data: { user } }) => {
  // TODO: Check filters
  const currentTeams = user.teams.filter(team => { return team.cohort.status === 'ongoing' });
  const pastTeams = user.teams.filter(team => { return team.cohort.status === 'ended' });

  let pendingApproval = user.cohorts.filter((cohort) => {
    let member = cohort.members.filter((member) => member.user.username === user.username && member.status === 'pending_approval');
    if (member.length >= 1) {
      return cohort;
    }
  });
  return (
    <div className="user-profile-background-color">
      <div className="user-profile-container">
        <aside className="user-profile">
          <UserSideBar user={user} />
        </aside>
        <main className="user-voyages">
          <section className="user-voyage">
            <div className="user-voyage-title">Current Voyages</div>
            {currentTeams.length > 0
              ? currentTeams.map((team, index) => {
                return (
                  <Cards.CurrentVoyageCardWithTeam
                    key={team.id + "_" + index}
                    voyageNumber={team.id}
                    startDate={team.cohort.start_date}
                    endDate={team.cohort.end_date}
                    team={team}
                  />
                )
              })
              : <Cards.ApplyForAVoyageCard />
            }
          </section>
          <section className="user-voyage">
            <div className="user-voyage-title">Upcoming Voyages</div>
            {
              pendingApproval.length > 0
                ? pendingApproval.map((cohort, index) => {
                  return (
                    <Cards.PendingApprovalVoyageCard
                      key={cohort.id + "_" + index}
                      voyageNumber={cohort.id}
                      startDate={cohort.start_date}
                      endDate={cohort.end_date}
                      cohort={cohort.title}
                    />
                  )
                })
                : null
            }
          </section>
          {
            pastTeams.length > 0
              ? <section className="user-voyage">
                <div className="user-voyage-title">Past Voyages</div>
                <div>
                  {pastTeams.map((team, index) => {
                    return (
                      <Cards.PreviousVoyageCardWithTeam
                        key={team.id + "_" + index}
                        voyageNumber={team.id}
                        startDate={team.cohort.start_date}
                        endDate={team.cohort.end_date}
                        team={team.title}
                      />
                    )
                  })}

                </div>
              </section>
              : null
          }
        </main>
      </div>
    </div>

  )
}

export default props =>
  <Request
    {...props} 
    component={UserProfile}
    query={profileQuery}
    globalLoader
  />
