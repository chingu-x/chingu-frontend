import React, { Fragment } from "react";
import { Link } from "react-router-dom"

const ProjectInfo = ({ project }) => {
  const { members, elevator_pitch, title, skills } = project;
  const infoObjects = [
    { label: 'Project', data: title },
    { label: 'Description', data: elevator_pitch },
    { label: 'Techstack', data: skills },
    { label: 'Members', data: members },
  ]

  return infoObjects.map((info, idx) => {
    let data;
    switch (info.label) {
      case 'Members':
        data = info.data.map((user, idx) => {
          return (
            <Link to={`/profile/${user.username}`} key={idx} className="team-card-user">
              <img 
                className="team-card-avatar-img" 
                src={user.avatar 
                  ? user.avatar 
                  : require('../../../assets/blank image.png')} 
                alt={user.username} 
              />
            </Link>
          )
        })
        break;
      case 'Techstack':
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

export default ProjectInfo;