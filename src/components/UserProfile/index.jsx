import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import * as Cards from "../VoyageCard/VoyageCard";
import UserSideBar from "./UserSideBar";
import Request from "../utilities/Request"
import profileQuery from "./graphql/profileQuery"
import './UserProfile.css'
import dateFormatter from "../utilities/dateFormatter.js"


// PROJECT CARD INFO //
const InfoComponents = ({ team }) => {
  const { project, cohort, tier, title } = team
  const infoObjects = [
    { label: 'Voyage Dates', data: dateFormatter(cohort.start_date) + " - " + dateFormatter(cohort.end_date) },
    { label: 'Team Name', data: title },
    { label: 'Project', data: project.title },
    { label: 'Elevator Pitch', data: project.elevator_pitch },
    { label: 'Tier', data: 'Tier ' + tier.level },
    { label: 'Team', data: project.users },
    // { label: 'Status', data: cohort.status },
    // { label: 'TechStack', data: project.skills },
  ]

  return infoObjects.map((info, idx) => {
    let data;
    switch (info.label) {
      case 'Team':
        data = info.data.map((user, idx) => {
          return (
            <Link to={`/profile/${user.username}`} key={idx} className="team-card-user">
              <img className="team-card-avatar-img" src={user.avatar ? user.avatar : require('../../assets/blank image.png')} alt={user.username} />
              {/* <div className="team-card-username">{user.username}</div> */}
            </Link>
          )
        })
        break;
      case 'TechStack':
        data = info.data && info.data.map((tech, idx) => {
          return (
            <div key={idx} className="team-card-techstac k">{tech.name}</div>
          )
        })
        break;
      default:
        data = info.data;
        break;
    }
    return (
      <Fragment key={idx} >
        <div className="project-info__label">{info.label}</div>
        <div className="project-info__data">{data}</div>
      </Fragment>
    )
  })
}

const ProjectCard = ({ team }) => {
  const { images } = team.project
  return (
    <div className="project-card__container">
      <Link to={`/project/${team.project.id}`}>
        <img
          className="project-img"
          src={images[0] ? images[0].url : require('../../assets/landingImage.png')} />
      </Link>
      <div className="project-info__container">
        <InfoComponents team={team} />
      </div>
    </div>
  )
}



// -- USER PROFILE (EXPORT) -- //
const UserProfile = props => {
  // Only allow editing if no /profile param provided. TODO: Check for currently logged in user
  const editable = !props.match.params.username

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

  const renderProjectCards = (currentTeams, pastTeams) => {
    const mapProjectCards = teamsList => teamsList.map(team => <ProjectCard key={team.project.id} team={team} />)
    return <Fragment>
      {!!currentTeams.length && <div className="user-voyage-title">Current Projects</div>}
      {mapProjectCards(currentTeams)}
      {!!pastTeams.length && <div className="user-voyage-title">Past Projects</div>}
      {mapProjectCards(pastTeams)}
    </Fragment>
  }

  const renderCurrentTeam = currentTeams => {
    let card = currentTeams.length > 0 && currentTeams.map((team, index) => {
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
    return (
      <Fragment>
        <div className="user-voyage-title">Current Voyages</div>
        {card}
      </Fragment>
    )
  }

  const renderPendingApproval = pendingApproval => (
    <Fragment>
      <div className="user-voyage-title">Upcoming Voyages</div>
      {
        pendingApproval.map((cohort, index) =>
          <Cards.PendingApprovalVoyageCard
            key={cohort.id + "_" + index}
            voyageNumber={cohort.id}
            startDate={cohort.start_date}
            endDate={cohort.end_date}
            cohort={cohort.title}
          />
        )}
    </Fragment>
  )

  const renderNoTeamTypeCards = pendingApproval => {
    const NothingHere = () => {
      return (
        <div className="no-data-card">
          Nothing Here Yet! Check Back Later!
        </div>
      )
    }
    let card;
    if (editable && pendingApproval.length > 0) {
      console.log('in 1')
      return null;
    } else if (editable) {
      console.log('in 2')
      card = <Cards.ApplyForAVoyageCard />
    } else if (!editable && pendingApproval.length === 0) {
      console.log('in 3')
      card = <NothingHere />
    }
    return (
      <Fragment>
        <div className="user-voyage-title">Current Voyages</div>
        {card}
      </Fragment>
    )
  }

  return (
    < div className="user-profile-background-color" >
      <div className="user-profile-container">
        <aside className="user-profile">
          <UserSideBar editable={editable} user={user} />
        </aside>

        <main className="user-voyages">
          <section className="user-voyage">
            {
              currentTeams.length > 0
                ? renderCurrentTeam(currentTeams)
                : renderNoTeamTypeCards(pendingApproval)
            }
          </section>
          <section className="user-voyage">
            {
              pendingApproval.length > 0
              && renderPendingApproval(pendingApproval)
            }
          </section>
          <section>
            {renderProjectCards(currentTeams, pastTeams)}
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
    globalLoader
  />


// class UserProfile extends React.Component {
//   state = {
//     user: this.props.data.user,
//     currentTeams: [],
//     pastTeams: [],
//     pendingApproval: [],
//     editable: false
//   }

//   updateState = () => {
//     let { data: { user }, editable } = this.props;
//     this.setState({ user: user, editable: editable ? true : false }, () => {
//       // TODO: Check filters
//       let { user } = this.state;
//       let { teams, cohorts } = user;
//       let currentTeams = teams.filter(team => { return team.cohort.status === 'ongoing' });
//       let pastTeams = teams.filter(team => { return team.cohort.status === 'ended' });

//       let pendingApproval = cohorts.filter((cohort) => {
//         let member = cohort.members.filter((member) => member.user.username === user.username && member.status === 'pending_approval');
//         if (member.length >= 1) {
//           return cohort;
//         }
//       });
//       this.setState({ currentTeams, pastTeams, pendingApproval });
//     })
//   }
//   componentDidMount() {
//     this.updateState();
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props !== prevProps) {
//       this.updateState();
//     }
//   }

//   renderCurrentTeam = () => {
//     let { currentTeams } = this.state;
//     let card = currentTeams.length > 0 && currentTeams.map((team, index) => {
//       return (
//         <Cards.CurrentVoyageCardWithTeam
//           key={team.id + "_" + index}
//           voyageNumber={team.id}
//           startDate={team.cohort.start_date}
//           endDate={team.cohort.end_date}
//           team={team}
//         />
//       )
//     })
//     return (
//       <Fragment>
//         <div className="user-voyage-title">Current Voyages</div>
//         {card}
//       </Fragment>
//     )
//   }

//   renderPendingApproval = () => {
//     let { pendingApproval } = this.state;
//     return pendingApproval.map((cohort, index) => {
//       return (
//         <Fragment key={cohort.id + "_" + index}>
//           <div className="user-voyage-title">Upcoming Voyages</div>
//           <Cards.PendingApprovalVoyageCard
//             key={cohort.id + "_" + index}
//             voyageNumber={cohort.id}
//             startDate={cohort.start_date}
//             endDate={cohort.end_date}
//             cohort={cohort.title}
//           />
//         </Fragment>
//       )
//     })
//   }
//   renderNoTeamTypeCards = () => {
//     let { user, currentTeams, pastTeams, pendingApproval, editable } = this.state;
//     const NothingHere = () => {
//       return (
//         <div className="no-data-card">
//           Nothing Here Yet! Check Back Later!
//         </div>
//       )
//     }
//     let card;
//     if (editable && pendingApproval.length > 0) {
//       console.log('in 1')
//       return null;
//     } else if (editable) {
//       console.log('in 2')
//       card = <Cards.ApplyForAVoyageCard />
//     } else if (!editable && pendingApproval.length === 0) {
//       console.log('in 3')
//       card = <NothingHere />
//     }
//     return (
//       <Fragment>
//         <div className="user-voyage-title">Current Voyages</div>
//         {card}
//       </Fragment>
//     )
//   }
//   render() {
//     console.log("Profile", this.props)
//     let { user, currentTeams, pastTeams, pendingApproval, editable } = this.state;
//     return (
//       <div className="user-profile-background-color" >
//         <div className="user-profile-container">
//           <aside className="user-profile">
//             <UserSideBar editable={this.state.editable} user={user} />
//           </aside>

//           <main className="user-voyages">
//             <section className="user-voyage">
//               {
//                 currentTeams.length > 0
//                   ? this.renderCurrentTeam()
//                   : this.renderNoTeamTypeCards()
//               }
//             </section>
//             <section className="user-voyage">
//               {
//                 pendingApproval.length > 0
//                 && this.renderPendingApproval()
//               }
//             </section>
//           </main>
//         </div>
//       </div >
//     )
//   }

// }


// {
//   pastTeams.length > 0
//   && <section className="user-voyage">
//     <div className="user-voyage-title">Past Voyages</div>
//     <div>
//       {pastTeams.map((team, index) => {
//         return (
//           <Cards.PreviousVoyageCardWithTeam
//             key={team.id + "_" + index}
//             voyageNumber={team.id}
//             startDate={team.cohort.start_date}
//             endDate={team.cohort.end_date}
//             team={team.title}
//           />
//         )
//       })}
//     </div>
//   </section>
// }

