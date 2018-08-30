import * as React from 'react';
import './Project.css';
import { Link } from "react-router-dom";

const Project = ({ project: { id, images, title, elevator_pitch } }) => {
  return (
    <Link to={`/project/${id}`} className="project">
      <img 
        className="project-image" 
        src={images[0] ? images[0].url : require('../../../assets/landingImage.png')} 
        alt="" 
      />
      <div className="project-info">
        <div className="project-title" >{title}</div>
        <div className="project-description" >{elevator_pitch}</div>
      </div>
    </Link>
  );
}

export default Project;

// {
//   techStack.map((techStack, index) => {
//     return (
//       <div key={index} className="landing-item-project-techStack">{techStack}</div>
//     )
//   })
// }