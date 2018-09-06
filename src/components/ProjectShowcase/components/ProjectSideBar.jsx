import * as React from "react";
import { Link } from "react-router-dom"
import ExternalLinks from './ExternalLinks';

const ProjectSideBar = ({ project, editable }) => {
  const { id, project_url, github_url, skills, tags, users } = project
  return (
    <div className="project-side-panel">
      <ExternalLinks
        editable={editable}
        project_id={id}
        project_url={project_url}
        github_url={github_url} />
      {skills && skills.length > 0 && <TechStack teckstack={skills} />}
      {tags && tags.length > 0 && <Tags tags={tags} />}
      {users && <Team users={users} />}
    </div>
  )
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
      <Link to={`/profile/${username}`} ><img className="project-portal__user-avatar" src={avatar} alt="team-pic" /></Link>
      <p className="project-portal__user-username">{username}</p>
    </div>
  );
}

export default ProjectSideBar;