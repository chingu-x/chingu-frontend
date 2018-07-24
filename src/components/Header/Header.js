import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";

import currentUserQuery from "../../queries/currentUserQuery"

const Header = props => {
  const { user, loading } = props.data
  const team = "Bears-Team-11";

  const handleLogout = e => {
    e.preventDefault();
    console.log("Logging out");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("store");
    window.location = "/";
  };

  const renderPortalDropDown = () => {
    return (
      <div className="header-dropdown portal">
        <button className="header-portal-btn" >
          <span>CHOOSE A PORTAL</span>
          <i className="fa fa-chevron-down" />
        </button>
        <div className="header-dropdown-content--centered portal">
          <Link to="/team">
            <div className="label">Team Portal</div>
            {team}
          </Link>
          <hr />
          <Link to="/voyage">Voyage Portal</Link>
          <hr />
          <Link to="/profile">User Profile</Link>
        </div>
      </div>
    )
  }

  const renderAvatar = () => {
    return (
      <div className="header-dropdown">
        <img className="avatar" src={user.avatar} alt="user avatar" />
        <div className="header-dropdown-content avatar">
          {/* <Link to="/settings">Settings</Link> */}
          <Link to="/" onClick={e => handleLogout(e)}>Log out</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="header header-dark">
      <div className="header-container">
        <div className="header-left">
          <div className="nav-logo">
            <Link className="nav-light" to="/">CHINGU</Link>
          </div>
        </div>

        {user && renderPortalDropDown()}

        <div className="header-right">
          {user && renderAvatar()}
          {!user && !loading && <Link to="/login" className="header-btn">LOG IN</Link>}
        </div>
      </div>
    </div>
  )
}

export default graphql(currentUserQuery)(Header);