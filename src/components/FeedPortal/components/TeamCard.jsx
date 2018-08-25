import * as React from 'react';
import dateFormatter from '../../utilities/dateFormatter';
import { Link } from "react-router-dom"
import './TeamCard.css';
import teamQuery from '../graphql/teamQuery';
import Request from "../../utilities/Request";

const TeamCard = ({ team_id, data: { user: { teams } } }) => {
  let teamData = teams.filter((indivTeam) => indivTeam.id == team_id);
  teamData = teamData[0];

  return (
    <div className="team-card-container">
      <div className="team-card-info-container">
        <InfoComponents team={teamData} />
      </div>
      <div className="team-card-buttons-container">
        <Link to={"/project/" + teamData.project.id + "/workspace"} className="user-btn">Team Workspace</Link>
        <Link to={"/project/" + teamData.project.id} className="user-btn">Project Showcase</Link>
        <Link className="user-btn" to={"/team/checkin/" + teamData.cohort.id}>Weekly Check-In</Link>
      </div>
    </div>
  )
}

const InfoComponents = ({ team }) => {
  if (!team) {
    return null;
  }
  let cohort = team.cohort;
  let project = team.project;
  let infoObjects = [
    { label: 'Team Name', data: team.title },
    { label: 'Voyage Dates', data: dateFormatter(cohort.start_date) + " - " + dateFormatter(cohort.end_date) },
    { label: 'Status', data: cohort.status },
    { label: 'Tier', data: 'Tier ' + team.tier.level },
    { label: 'Team', data: project.users },
    { label: 'Project', data: project.title },
    { label: 'Description', data: project.description },
    { label: 'TechStack', data: project.skills },
  ]

  return infoObjects.map((info, idx) => {
    let data;
    switch (info.label) {
      case 'Team':
        data = info.data.map((user, idx) => {
          return (
            <div key={idx} className="team-card-user">
              <img className="team-card-avatar-img" src={user.avatar ? user.avatar : require('../../../assets/blank image.png')} alt={user.username} />
              <div className="team-card-username">{user.username}</div>
            </div>
          )
        })
        break;
      case 'TechStack':
        data = info.data.map((tech, idx) => {
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
      <div className="team-card-info" key={idx}>
        <div className="team-card-info--label">{info.label}</div>
        <div className="team-card-info--data">{data}</div>
      </div>
    )
  })
}

export default props =>
  <Request
    component={TeamCard}
    query={teamQuery}
    globalLoader
    {...props} />
