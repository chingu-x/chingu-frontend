import * as React from "react";
import { Link } from "react-router-dom"

export const ProjectImage = ({ project }) => {
  return (
    <Link className="project-img" to={`/project/${project.id}`}>
      <img
        className="project-img"
        src={require('../../../public/favicon/favicon-96x96.png')} />
    </Link>
  )
}