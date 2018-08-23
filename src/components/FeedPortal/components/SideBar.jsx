import React, { Fragment } from "react"
import sidebarQuery from '../graphql/sidebarQuery';
import Request from "../../utilities/Request"

const SidebarBtn = ({ lbl, active, team }) => (
  <Fragment>
    <hr className="hl" />
    {team ? <img className="sidebar-nav__btn-icon" src={require('../../../assets/team-icon.png')} alt="team-icon" /> : null}
    <div className={`sidebar-nav__btn ${active ? "active" : null}`}>{lbl}</div>
  </Fragment>
)

const TeamLinks = ({ teams }) => {
  let renderedTeamLinks = teams.map((team, idx) => {
    return (
      <SidebarBtn team={true} key={idx} lbl={team.cohort.title + "/" + team.title} />
    )
  })
  return (
    <React.Fragment>{renderedTeamLinks}</React.Fragment>
  )
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

        <SidebarBtn lbl="All News" />

        <hr className="hl" />

        <label className="sidebar-nav__label">Your Teams</label>
        <TeamLinks />

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
