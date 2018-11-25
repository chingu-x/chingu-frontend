import * as React from "react";
import { Link } from "react-router-dom"

const ProjectCardCreator = ({
  leftPanel,
  rightPanel,
  projectInfo,
  cohortProjectInfo
}) => {
  return (
    <div className="project-card__container">
      <React.Fragment>{leftPanel()}</React.Fragment>
      <React.Fragment>
        {rightPanel()}
        {cohortProjectInfo ? cohortProjectInfo() : null}
        {projectInfo ? projectInfo() : null}
      </React.Fragment>
    </div>
  )
}

export const CohortProjectCard = ({ project }) => {
  return (
    <ProjectCardCreator

    />
  )
}

export const ProjectImage = ({ project }) => {
  return (
    <Link className="project-img" to={`/project/${id}`}>
      <img
        className="project-img"
        src={require('../../../assets/landingImage.png')} />ZZZZZZZZZZZZZZZZZZZZZZ

    </Link>
  )
}