import * as React from "react";
import CohortProjectInfo from './CohortProjectInfo';
import ProjectImage from './ProjectImage';
import ProjectInfo from './ProjectInfo';
import TeamButtons from './TeamButtons';
import TeamResourceLinks from './TeamResourceLinks';
import './ProjectCard.css';
import './TeamCard.css';

const ProjectCardCreator = ({
  noData,
  imagePanel,
  projectInfo,
  cohortProjectInfo,
  teamCard,
  rightPanel,
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
    <div className={teamCard ? "team-card-container" : "project-card__container"}>
      {imagePanel ? imagePanel() : null}
      <div className={teamCard ? "team-card-info-container" : `project-info__container`}>
        {cohortProjectInfo ? cohortProjectInfo() : null}
        {projectInfo ? projectInfo() : null}
      </div>
      {rightPanel ? rightPanel() : null}
      {footer ? footer() : null}
    </div>
  )
}

export const TeamProjectCard = ({ project }) => {
  return (
    <ProjectCardCreator
      teamCard={true}
      cohortProjectInfo={() => <CohortProjectInfo project={project} />}
      projectInfo={() => <ProjectInfo project={project} />}
      rightPanel={() => <TeamButtons project={project} />}
      footer={() => <TeamResourceLinks project={project} />}
    />
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