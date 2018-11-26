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
      <div className="no-news-card--container">
        <img
          className="no-news-card--icon"
          src={require('../../assets/sad-face.png')}
          alt="sad"
        />
        <div className="no-news-text">Nothing Here Yet!</div>
      </div>
    )
  }
  return (
    <div className="project-card__container">
      {imagePanel()}
      <div className="project-info__container">
        {cohortProjectInfo ? cohortProjectInfo() : null}
        {projectInfo ? projectInfo() : null}
      </div>
      {footer ? footer() : null}
    </div>
  )
}

export const CohortProjectCard = ({ project }) => {
  return (
    <ProjectCardCreator
      cohortProjectInfo={() => <CohortProjectInfo project={project} />}
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