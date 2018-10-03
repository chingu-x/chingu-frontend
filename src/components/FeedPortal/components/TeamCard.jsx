import * as React from 'react';
import { Link } from "react-router-dom"
import './TeamCard.css';
import InfoComponents from './InfoComponents';
import TeamLinks from './TeamLinks';


const TeamCard = ({ user: { available_standups }, team }) => {
  let editorIsVisible = false;

  const availableStandup = (
    !!available_standups.length &&
    available_standups.find(su => su.team.id === team.id)
  );

  const standupStatus = availableStandup
    ? ""
    : "--disabled"

  const toggleEditorVisibility = () => {editorIsVisible = !editorIsVisible}

  return (
    <div className="team-card-container">
      <div className="team-card-info-container">
        <InfoComponents team={team} />
      </div>
      <div className="team-card-buttons-container">
      
        <Link
          to={"#"}
          className="user-btn--disabled">Team Workspace
          </Link>
        <Link to={"/project/" + team.project.id} className="user-btn">Project Page</Link>
        <Link
          className={`user-btn${standupStatus}`}
          to={availableStandup ? `/team/standup/${availableStandup.id}` : "#"}
        >{availableStandup ? "Submit Standup" : "No Standup Available"}</Link>

        <div className="team-resource-links-container">
          <img
            alt="edit links"
            className="team-resource-links"
            src={require(`../../../assets/links.png`)}
            onClick={() => toggleEditorVisibility()}
          />
          { team.project && <TeamLinks project={team.project} />}
        </div>
        
      </div>
    </div >
  )
}

const InfoComponents = ({ team }) => {
  let cohort = team.cohort;
  let project = team.project;
  let infoObjects = [
    { label: 'Voyage', data: `${cohort.title} - ${dateFormatter(cohort.start_date)} - ${dateFormatter(cohort.end_date)}` },
    { label: 'Status', data: cohort.status },
    { label: 'Team', data: team.title },
    { label: 'Tier', data: 'Tier ' + team.tier.level },
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
              <img className="team-card-avatar-img" src={user.avatar || require('../../../assets/blank image.png')} alt={user.username} />
              <div className="team-card-username">{user.username}</div>
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
      <div className="team-card-info" key={idx}>
        <div className="team-card-info--label">{info.label}</div>
        <div className="team-card-info--data">{data}</div>
      </div>
    )
  })
}

export default TeamCard;