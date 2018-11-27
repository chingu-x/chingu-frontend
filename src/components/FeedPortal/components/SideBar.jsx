import React, { Fragment } from "react"
import PropTypes from "prop-types"
import sidebarQuery from '../graphql/sidebarQuery';
import Request from "../../utilities/Request"

const SidebarBtn = ({ project, lbl, active, action }) => {
  // todo: semantic html: use <button> or <a> -> needs styling
  return (
    <div 
      className={`sidebar-nav__btn-ctn ${active ? "active" : ""}`}
      onClick={() => {
        if (active) return;
        const type = project ? "PROJECT" : "ALL";
        const project_id = project && project.id;
        return action(type, project_id);
      }}
    >
      {/* {
        !!project &&
        <img
          className="sidebar-nav__btn-icon"
          src={require('../../../assets/team-icon.png')}
          alt="project-icon"
        />
      } */}
      <div className="sidebar-nav__btn">{lbl}</div>
    </div>
  )
}

SidebarBtn.propTypes = {
  project: PropTypes.object,
  action: PropTypes.func.isRequired,
  lbl: PropTypes.string.isRequired,
  active: PropTypes.bool
}

const ProjectLinks = ({ projects, toggleNewsfeed, activeProjectID }) => {
  let renderedTeamLinks = projects.map((project, idx) => (
    <SidebarBtn
      action={toggleNewsfeed}
      project={project}
      key={idx}
      active={activeProjectID === project.id}
      lbl={project.cohort.title + "/" + project.team_name}
    />
  ));

  return <Fragment>{renderedTeamLinks || null}</Fragment>
}

const SideBar = ({ data, data: { user }, toggleNewsfeed, project_id }) => {
  return (
    <aside className="sidebar-container">
      <div className="portal-panel__sidebar">
        <div className="sidebar-userinfo__container">
          <img
            className="sidebar-userinfo__avatar"
            src={user.avatar}
            alt="User Avatar" />
          <div className="sidebar-userinfo__username">{user.username}</div>
        </div>
        <hr className="hl" />

        <SidebarBtn
          action={toggleNewsfeed}
          active={!project_id}
          lbl="All News" />
        <hr className="hl" />

        {user.active_projects.length > 0
          && (
            <React.Fragment>
              <hr className="hl" />

              <label className="sidebar-nav__label">Your Active Projects</label>
              <ProjectLinks
                activeProjectID={project_id}
                projects={user.active_projects}
                toggleNewsfeed={toggleNewsfeed}
              />
            </React.Fragment>
          )
        }
        <hr className="hl" />

      </div>
    </aside>
  )
}

SideBar.propTypes = {
  project_id: PropTypes.string
}

SideBar.defaultProps = {
  project_id: null,
}

export default props => (
  <Request
    {...props}
    component={SideBar}
    query={sidebarQuery}
    loader
  />
);
