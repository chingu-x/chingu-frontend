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
    { label: 'Voyage', data: `${cohort.title} / ${dateFormatter(cohort.start_date)} - ${dateFormatter(cohort.end_date)}` },
    { label: 'Team', data: title },
    { label: 'Tier', data: 'Tier ' + tier.level },
    { label: 'Project', data: project.title },
    { label: 'Description', data: project.elevator_pitch },
    { label: 'Members', data: project.users },
  ]

  return infoObjects.map((info, idx) => {
    let data;
    switch (info.label) {
      case "Tier":
        data = <span key={idx} className="tier-icon">{info.data}</span>
        break;
      case 'Members':
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
            <div key={idx} className="team-card-techstack">{tech.name}</div>
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

  const renderProjectCards = teamsList => teamsList.map(team => {
    const { id, images } = team.project
    return (
      <div key={id} className="project-card__container">
        <Link className="project-img" to={`/project/${id}`}>
          <img
            className="project-img"
            src={images[0] ? images[0].url : require('../../assets/landingImage.png')} />
        </Link>
        <div className="project-info__container">
          <InfoComponents team={team} />
        </div>
      </div>
    )
  })

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
          <section className="user-voyage">
            {!!currentTeams.length && <div className="user-voyage-title">Current Projects</div>}
            {renderProjectCards(currentTeams)}
            {!!pastTeams.length && <div className="user-voyage-title">Past Projects</div>}
            {renderProjectCards(pastTeams)}
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
