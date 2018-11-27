import * as React from "react";
import { Link } from "react-router-dom"

const ProjectImage = ({ project }) => {
  return (
    <Link className="project-img-container" to={`/project/${project.id}`}>
      <img
        className="project-img"
        src={require('../../assets/Artboard 17.png')} />
       <div className="project-img-text">Work In Progress</div>
    </Link>
  )
}

export default ProjectImage;