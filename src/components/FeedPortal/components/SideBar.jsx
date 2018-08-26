import React, { Fragment } from "react"
import sidebarQuery from '../graphql/sidebarQuery';
import Request from "../../utilities/Request"

// TODO: implement 'active' prop
// check team_id === team.id

const SidebarBtn = ({ lbl, team, activeTeamId, action }) => (
  <div
    className="sidebar-nav__btn-ctn"
    onClick={
      () => action(
        team ? 'TEAM' : 'ALL',
        team && team.id,
      )
    }
  >
    {
      team &&
      <img
        className="sidebar-nav__btn-icon"
        src={require('../../../assets/team-icon.png')}
        alt="team-icon"
      />
    }
    <div
      className={
        `sidebar-nav__btn ${team && (activeTeamId === team.id && "active")}`
      }
    >
      {lbl}
    </div>
  </div>
)

const TeamLinks = ({ teams, toggleNewsfeed, activeTeamId }) => {
  let renderedTeamLinks = teams.map((team, idx) => {
    return (
      <SidebarBtn
        action={toggleNewsfeed}
        team={team}
        key={idx}
        activeTeamId={activeTeamId}
        lbl={team.cohort.title + "/" + team.title}
      />
    );
  })

  return <Fragment>{renderedTeamLinks || null}</Fragment>
}

const SideBar = ({ data: { user }, toggleNewsfeed, team_id }) => {
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

        <SidebarBtn action={toggleNewsfeed} lbl="All News" />
        <hr className="hl" />

        <label className="sidebar-nav__label">Your Teams</label>

        <TeamLinks
          activeTeamId={team_id}
          teams={user.teams}
          toggleNewsfeed={toggleNewsfeed}
        />
        <hr className="hl" />

      </div>
    </aside>
  )
}

export default props => (
  <Request
    {...props} 
    component={SideBar}
    query={sidebarQuery}
    globalLoader
  />
);
