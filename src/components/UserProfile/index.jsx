import * as React from "react";
import * as Cards from "../VoyageCard/VoyageCard";
import UserSideBar from "./UserSideBar";
import './UserProfile.css'
import GetUser from "../utilities/GetUser"
import userProfileQuery from "../../queries/userProfileQuery"
// import Store from '../../AppGlobalStore';

class UserProfile extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user: {
  //       teams: [],
  //       cohorts: []
  //     }
  //   }
  // }

  // componentDidMount() {
  //   // let user = Store.getUserState();
  //   const { user } = JSON.parse(window.localStorage.getItem('store'));
  //   this.setState({ user: user }, () => {
  //     // let pendingApproval = user.cohorts.filter((cohort) => {
  //     //   let member = cohort.members.filter((member) => member.user.username === Store.state.user.username && member.status === 'pending_approval');
  //     //   if (member.length >= 1) {
  //     //     return cohort;
  //     //   }
  //     // });
  //     // console.log(pendingApproval);
  //   });
  // }
  render() {
    const { loading, user } = this.props
    console.log("profile", { loading, user })
    // let user = this.state.user;
    // const user = this.props.user
    const currentTeams = user.teams.filter(team => { return team.cohort.status === 'ongoing' });
    const pastTeams = user.teams.filter(team => { return team.cohort.status === 'ended' });

    let pendingApproval = user.cohorts.filter((cohort) => {
      let member = cohort.members.filter((member) => member.user.username === user.username && member.status === 'pending_approval');
      if (member.length >= 1) {
        return cohort;
      }
    });
    return (
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
                    team={team.title}
                  />
                )
              })
              : <Cards.ApplyForAVoyageCard />
            }
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
    );
  }
}

export default props => <GetUser query={userProfileQuery} load><UserProfile {...props} /></GetUser>;
