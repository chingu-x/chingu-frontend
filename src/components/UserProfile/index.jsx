import * as React from "react";
import * as Cards from "../VoyageCard/VoyageCard";
import UserSideBar from "./UserSideBar";
import Request from "../utilities/Request"
import profileQuery from "./graphql/profileQuery"
import './UserProfile.css'

class UserProfile extends React.Component {
  state = {
    user: this.props.data.user,
    currentTeams: [],
    pastTeams: [],
    pendingApproval: [],
    editable: false
  }

  updateState = () => {
    let { data: { user }, editable } = this.props;
    this.setState({ user: user, editable: editable ? true : false }, () => {
      // TODO: Check filters
      let { user } = this.state;
      let { teams, cohorts } = user;
      let currentTeams = teams.filter(team => { return team.cohort.status === 'ongoing' });
      let pastTeams = teams.filter(team => { return team.cohort.status === 'ended' });

      let pendingApproval = cohorts.filter((cohort) => {
        let member = cohort.members.filter((member) => member.user.username === user.username && member.status === 'pending_approval');
        if (member.length >= 1) {
          return cohort;
        }
      });
      this.setState({ currentTeams, pastTeams, pendingApproval });
    })
  }
  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateState();
    }
  }

  render() {
    let { user, currentTeams, pastTeams, pendingApproval, editable } = this.state;
    return (
      <div className="user-profile-background-color" >
        <div className="user-profile-container">
          <aside className="user-profile">
            <UserSideBar editable={this.state.editable} user={user} />
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
                : editable
                  ? <Cards.ApplyForAVoyageCard />
                  : (
                    <div className="no-data-card">
                      Nothing Here Yet! Check Back Later!
                    </div>
                  )
              }
            </section>
            <section className="user-voyage">
              {
                pendingApproval.length > 0
                && pendingApproval.map((cohort, index) => {
                  return (
                    <React.Fragment key={cohort.id + "_" + index}>
                      <div className="user-voyage-title">Upcoming Voyages</div>
                      <Cards.PendingApprovalVoyageCard
                        key={cohort.id + "_" + index}
                        voyageNumber={cohort.id}
                        startDate={cohort.start_date}
                        endDate={cohort.end_date}
                        cohort={cohort.title}
                      />
                    </React.Fragment>
                  )
                })
              }
            </section>
            {
              pastTeams.length > 0
              && <section className="user-voyage">
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
            }
          </main>
        </div>
      </div>
    )
  }

}

export default props => (
  <Request
    {...props}
    query={profileQuery}
    variables={props.username && { username: props.username }}
    component={UserProfile}
    globalLoader
  />)
