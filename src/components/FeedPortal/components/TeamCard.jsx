import * as React from 'react';
import { Link } from "react-router-dom"
import './TeamCard.css';
import TeamLinks from './TeamLinks';
import dateFormatter from '../../utilities/dateFormatter';

const TeamCard = ({ project: { id, available_standup } }) => {
  let editorIsVisible = false;

  const standupStatus = available_standup
    ? ""
    : "--disabled"

  const toggleEditorVisibility = () => {editorIsVisible = !editorIsVisible}

  return (
    <div className="team-card-container">
      {/* <div className="team-card-info-container">
        <InfoComponents team={team} />
      </div> */}
      <div className="team-card-buttons-container">
        <Link to={`/project/${id}`} className="user-btn">
          Project Page
        </Link>
        <Link
          className={`user-btn${standupStatus}`}
          to={available_standup ? `/project/standup/${available_standup.id}` : "#"}
        >
          {available_standup ? "Submit Standup" : "No Standup Available"}
        </Link>
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