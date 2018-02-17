import React from "react";

const ProjectDisplay = ({ project }) => {
  console.log(project.skills);

  // Render skills boxes.  Skill currently not implemented.
  function renderSkills(skills){
    if(skills.length > 0) {
      return Object.keys(skills).map(skill => {
        return (
          <div key={skill} className="profile-skills">Skills</div>
        );
      })
    } else {
      return null;
    }
  }

  return (
    <div>
      <div>{project.title}</div>
      <div>
        <a href={project.github_url}>Live</a>
        <a href={project.project_url}>Github</a>
      </div>
      <div>{project.description}</div>
      <div>Team: {Object.keys(project.users).map(user => {
        return <a key={user} href={`/user/${project.users[user].username}`}>{project.users[user].username}</a>
      }) }</div>
      <div>{renderSkills(project.skills)}</div>
    </div>
  );
};

export default ProjectDisplay;
