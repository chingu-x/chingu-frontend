import React, { Fragment } from "react"
// import sidebarQuery from '../graphql/sidebarQuery';
import Request from "../../utilities/Request"
import PropTypes from "prop-types"
import { gql } from "apollo-boost"


// -- QUERIES -- // 
const sidebarHeaderQuery = gql`
  {
    user {
      id
      username
      avatar
    }
  }
`
const sidebarTeamsQuery = gql`
  {
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

// TODO: Remove mock teams
const teamsMock = [{
  id: 2,
  title: "vampires Team B",
  cohort: {
    id: 2,
    title: "Voyage B",
    start_date: Date.now() - 400,
    end_date: Date.now() - 200
  }
},
{
  id: 3,
  title: "vampires Team C",
  cohort: {
    id: 3,
    title: "Voyage C",
    start_date: Date.now() - 100,
    end_date: Date.now() + 100
  }
}, {
  id: 1,
  title: "vampires Team A",
  cohort: {
    id: 1,
    title: "Voyage A",
    start_date: Date.now() - 700,
    end_date: Date.now() - 500,
  }
},]



// -- SIDEBAR HEADER -- // 
const SidebarBtn = ({ lbl, active, team }) => (
  <div className="sidebar-nav__btn-ctn">
    {team ? <img className="sidebar-nav__btn-icon" src={require('../../../assets/team-icon.png')} alt="team-icon" /> : null}
    <div className={`sidebar-nav__btn ${active ? "active" : null}`}>{lbl}</div>
  </div>
)

const SidebarHeader = ({ data }) => {
  if (!data) return "Loading..." // TODO: Insert small inline loader
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

const TeamLinks = ({ data, toggleNewsFeed, team_id }) => {
  if (!data) return "Loading..." // TODO: Small loader

  // TODO: use data.user.teams to map over
  const renderedTeamLinks = teamsMock.map((team, idx) => (
    <SidebarBtn
      team
      key={idx}
      onClick={() => toggleNewsFeed("TEAM")}
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

        <SidebarBtn lbl="All News" onClick={() => toggleNewsFeed("ALL")} />
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
  toggleNewsFeed: PropTypes.func.isRequired,
  team_id: PropTypes.oneOfType([null, PropTypes.number])
}

SideBar.defaultProps = {
  team_id: null
}

export default SideBar