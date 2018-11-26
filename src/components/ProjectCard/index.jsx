import * as React from "react";
import CohortProjectInfo from './CohortProjectInfo';
import ProjectImage from './ProjectImage';
import ProjectInfo from './ProjectInfo';
import './ProjectCard.css';

const ProjectCardCreator = ({
  noData,
  imagePanel,
  projectInfo,
  cohortProjectInfo,
  footer
}) => {
  if (noData) {
    return (
      <div className="no-data-card">
        Nothing Here Yet! Check Back Later!
      </div>
    )
  }
  return (
    <div className="project-card__container">
      {imagePanel()}
      <div className="project-info__container">
        {projectInfo ? projectInfo() : null}
      </div>
      {footer ? footer() : null}
    </div>
  )
}

export const CohortProjectCard = ({ project }) => {
  return (
    <ProjectCardCreator
      imagePanel={() => <ProjectImage project={project} />}
      projectInfo={() => <ProjectInfo project={project} />}
    />
  )
}

export const ProjectCard = ({ project }) => {
  return (
    <ProjectCardCreator
      imagePanel={() => <ProjectImage project={project} />}
      projectInfo={() => <ProjectInfo project={project} />}
    />
  )
}

export const NoProjectCard = () => {
  return (
    <ProjectCardCreator
      noData={true}
    />
  )
}