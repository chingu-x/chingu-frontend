import React, { Fragment } from "react"
import sidebarQuery from '../graphql/sidebarQuery';
import Request from "../../utilities/Request"

const SidebarBtn = ({ lbl, active, team }) => (
  <div className="sidebar-nav__btn-ctn">
    {team ? <img className="sidebar-nav__btn-icon" src={require('../../../assets/team-icon.png')} alt="team-icon" /> : null}
    <div className={`sidebar-nav__btn ${active ? "active" : null}`}>{lbl}</div>
  </div>
)

const TeamLinks = teams => {
  // TEMP REMOVE for people withr no teams !!!!!
  if (!teams.length) {
    teams = [{
      title: "bears11",
      cohort: { title: "voyage1" }
    }, {
      title: "dragons3",
      cohort: { title: "voyage11" }
    }]
  }

  let renderedTeamLinks = teams.map((team, idx) => {
    return <SidebarBtn team key={idx} lbl={team.cohort.title + "/" + team.title} />
  })

  return <Fragment>{renderedTeamLinks || null}</Fragment>
}

const SideBar = ({ data: { user } }) => {
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

        <SidebarBtn lbl="All News" />
        <hr className="hl" />

        <label className="sidebar-nav__label">Your Teams</label>

        <TeamLinks teams={user.teams} />
        <hr className="hl" />

      </div>
    </aside>
  )
}

export default props =>
  <Request
    component={SideBar}
    query={sidebarQuery}
    globalLoader
    {...props} />
