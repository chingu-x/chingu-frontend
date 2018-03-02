import React from "react";
import projectImage from "../../styles/assets/project-placeholder.png";

const ProjectDisplay = ({ project }) => {
  console.log(project.skills);

  // Render skills boxes.  Skill currently not implemented.
  function renderSkills(skills) {
    if (skills.length > 0) {
      return Object.keys(skills).map(skill => {
        return (
          <div key={skill} className="profile-skills">
            Skills
          </div>
        );
      });
    } else {
      return null;
    }
  }

  return (
    <div className="project-display">
      <div className="project-display-left">
        <img src={projectImage} alt="User" />
      </div>
      <div className="project-display-right">
        <div className="project-display-title">{project.title}</div>
        <div className="project-display-links">
          <a href={project.github_url || "/"}>Live</a>
          <a href={project.project_url || "/"}>Github</a>
        </div>
        <div className="project-display-desc">
          {project.description || "Description not provided."}
        </div>
        <div className="project-display-links">
          <span>Team:</span>
          {Object.keys(project.users).map(user => {
            return (
              <a key={user} href={`/user/${project.users[user].username}`}>
                {project.users[user].username}
              </a>
            );
          })}
        </div>
        <div>{renderSkills(project.skills)}</div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
