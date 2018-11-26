import * as React from "react";
import { Link } from "react-router-dom"

const ProjectImage = ({ project }) => {
  return (
    <Link className="project-img" to={`/project/${project.id}`}>
      <img
        className="project-img"
        src={require('./defaultProjectImg.png')} />
    </Link>
  )
}

export default ProjectImage;