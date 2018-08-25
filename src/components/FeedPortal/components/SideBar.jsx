import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { gql } from "apollo-boost"
import Request from "../../utilities/Request"
import Loader from "../../Loader"

// -- QUERIES -- // 
const sidebarHeaderQuery = gql`
 query getSidebarUser{
    user {
      id
      username
      avatar
    }
  }
`
const sidebarTeamsQuery = gql`
  query getSidebarTeams{
    user {
      id
      teams {
        id
        title
        cohort {
          id
          title
        }
        tier {
          id
          level
        }
      }
    }
  }
`

// -- SIDEBAR HEADER -- // 
const SidebarBtn = ({ lbl, active, team, toggleNewsFeed }) => {
  return (
    <div onClick={toggleNewsFeed} className="sidebar-nav__btn-ctn">
      {team ? <img className="sidebar-nav__btn-icon" src={require('../../../assets/team-icon.png')} alt="team-icon" /> : null}
      <div className={`sidebar-nav__btn ${active ? "active" : null}`}>{lbl}</div>
    </div>
  )
}
const SidebarHeader = ({ loading, data }) => {
  if (loading) return <div style={{ height: "180.8px" }}><Loader style="medium" /></div>
  const { user: { username, avatar } } = data
  return (
    <div className="sidebar-userinfo__container">
      <img
        className="sidebar-userinfo__avatar"
        src={avatar}
        alt="User Avatar" />
      <div className="sidebar-userinfo__username">{username}</div>
    </div>
  )
}

const TeamLinks = ({ loading, data, toggleNewsFeed, team_id }) => {
  if (loading) return null

  const renderedTeamLinks = data.user.teams.map((team, idx) => (
    <SidebarBtn
      team
      key={idx}
      toggleNewsFeed={() => toggleNewsFeed("TEAM", team.id)}
      lbl={team.cohort.title + "/" + team.title}
      active={team.id === team_id} />
  ))

  return <Fragment>{renderedTeamLinks || null}</Fragment>
}

// -- SIDEBAR CONTAINER -- //
const SideBar = ({ toggleNewsFeed, team_id }) => {
  return (
    <div className="sidebar-container">
      <div className="portal-panel__sidebar">

        <Request
          component={SidebarHeader}
          query={sidebarHeaderQuery} />
        <hr className="hl" />

        <SidebarBtn
          toggleNewsFeed={() => toggleNewsFeed("ALL")}
          lbl="All News"
          active={team_id === null} />
        <hr className="hl" />

        <label className="sidebar-nav__label">Your Teams</label>

        <Request
          component={TeamLinks}
          query={sidebarTeamsQuery}
          toggleNewsFeed={toggleNewsFeed}
          team_id={team_id} />
        <hr className="hl" />

      </div>
    </div>
  )
}

SideBar.propTypes = {
  team_id: PropTypes.number,
  toggleNewsFeed: PropTypes.func.isRequired
}

SideBar.defaultProps = {
  team_id: null,
  toggleNewsFeed: console.log
}

export default SideBar