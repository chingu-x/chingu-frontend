import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import dateFormatter from "../../utilities/dateFormatter.js"

const InfoComponents = ({ project }) => {
  const { cohort, tier, title } = project;
  const infoObjects = [
    // { label: 'Voyage', data: `${cohort.title} / ${dateFormatter(cohort.start_date)} - ${dateFormatter(cohort.end_date)}` },
    // { label: 'Team', data: title },
    // { label: 'Tier', data: 'Tier ' + tier.level },
    { label: 'Project', data: project.title },
    { label: 'Description', data: project.elevator_pitch },
    { label: 'Members', data: project.members },
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
              <img className="team-card-avatar-img" src={user.avatar ? user.avatar : require('../../../assets/blank image.png')} alt={user.username} />
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

export default InfoComponents;