import * as React from "react";

const ProjectSideBar = ({ project }) => {
  console.log(project)
  return (
    <div className="project-side-panel">
      <ExternalLinks data={project} />
      {project.skills && project.skills.length > 0 && <TechStack teckstack={project.skills} />}
      {project.tags && project.tags.length > 0 && <Tags tags={project.tags} />}
      {project.users && <Team users={project.users} />}
    </div>
  )
}

const ExternalLinks = ({ data: { github_url, project_url } }) => {
  return (
    <React.Fragment>
      <div className="project-subcategory">
        <h1 className="project-subcategory-title">Links</h1>
        <div className="project-buttons-container">
          <a className="project-buttons" target="_blank" href={github_url}>GitHub Repo</a>
          <a className="project-buttons" target="_blank" href={project_url}>Live Preview</a>
        </div>
      </div>
      <hr className="project-side-panel--hline" />
    </React.Fragment>
  );
}

const TechStack = ({ skills }) => {
  return (
    <React.Fragment>
      <div className="project-subcategory">
        <h1 className="project-subcategory-title">skills</h1>
        <div className="project-tags-container">
          {skills.map((skill, idx) => {
            return <li key={idx} className="project-tags">{skill}</li>
          })}
        </div>
      </div>
      <hr className="project-side-panel--hline" />
    </React.Fragment>
  )
}

const Tags = ({ tags }) => {
  return (
    <React.Fragment>
      <div className="project-subcategory">
        <h1 className="project-subcategory-title">tags</h1>
        <div className="project-tags-container">
          {tags.map((tag, idx) => {
            return <li key={idx} className="project-tags">{tag}</li>
          })}
        </div>
      </div>
      <hr className="project-side-panel--hline" />
    </React.Fragment>
  )
}

const Team = ({ users }) => {
  return (
    <div className="project-subcategory">
      <h1 className="project-subcategory-title">Team</h1>
      <div className="project-team-container">
        {users.map((user, idx) => {
          return <Profile user={user} key={idx} />
        })}
      </div>
    </div>
  );
}

const Profile = ({ user: { username, avatar } }) => {
  return (
    <div className="project-portal__profile">
      <img className="project-portal__user-avatar" src={avatar} alt="team-pic" />
      <p className="project-portal__user-username">{username}</p>
    </div>
  );
}

export default ProjectSideBar;