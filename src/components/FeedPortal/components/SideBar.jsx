import React, { Fragment } from "react"
import PropTypes from "prop-types"
import sidebarQuery from '../graphql/sidebarQuery';
import Request from "../../utilities/Request"

const SidebarBtn = ({ team, lbl, active, action }) => {
  return (
    <div
      className={`sidebar-nav__btn-ctn ${active ? "active" : ""}`}
      onClick={
        () => !active && action(
          !!team ? 'TEAM' : 'ALL',
          team && team.id,
        )
      }
    >
      {
        !!team &&
        <img
          className="sidebar-nav__btn-icon"
          src={require('../../../assets/team-icon.png')}
          alt="team-icon"
        />
      }
      <div className="sidebar-nav__btn" >
        {lbl}
      </div>
    </div>
  )
}

SidebarBtn.propTypes = {
  team: PropTypes.object,
  action: PropTypes.func.isRequired,
  lbl: PropTypes.string.isRequired,
  active: PropTypes.bool
}

const TeamLinks = ({ teams, toggleNewsfeed, activeTeamId }) => {
  let renderedTeamLinks = teams.map((team, idx) => {
    return (
      <SidebarBtn
        action={toggleNewsfeed}
        team={team}
        key={idx}
        active={activeTeamId === team.id}
        lbl={team.cohort.title + "/" + team.title}
      />
    );
  })

  return <Fragment>{renderedTeamLinks || null}</Fragment>
}

const SideBar = ({ data: { user }, toggleNewsfeed, team_id }) => {
  console.log(user.teams);
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
          active={!team_id}
          lbl="All News" />
        <hr className="hl" />

        {user.teams.length > 0
          && (
            <React.Fragment>
              <hr className="hl" />

              <label className="sidebar-nav__label">Your Teams</label>

              <TeamLinks
                activeTeamId={team_id}
                teams={user.teams}
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
  team_id: PropTypes.number
}

SideBar.defaultProps = {
  team_id: null,
}

export default props => (
  <Request
    {...props}
    component={SideBar}
    query={sidebarQuery}
    globalLoader
  />
);
