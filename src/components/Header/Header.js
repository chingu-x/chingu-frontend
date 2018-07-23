import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";

import currentUserQuery from "../../queries/currentUserQuery"

const Header = props => {
  const { user } = props.data
  
  const handleLogout = e => {
    e.preventDefault();
    console.log("Logging out");
    window.localStorage.removeItem("token");
    // TODO Update App auth state

    window.location = "/";
  };

  const renderPortalDropDown = () => {
    return (
      <div className="header-dropdown">
        <button className="header-portal-btn" >
          <span>CHOOSE A PORTAL</span>
          <i className="fa fa-chevron-down"/>
        </button>
        <div 
          className="header-dropdown-content"
        >
          <a href="#">Voyage 125</a>
          <a href="#">Another Voyage</a>
          <a href="#">User Profile</a>
          <a href="#">Voyage 125</a>
          <a href="#">Another Voyage</a>
        </div>
      </div>
    )
  }

  const renderAvatar = () => {
    return (
      <div className="header-dropdown">
        <img className="avatar" src={user.avatar} alt="user avatar"/>
        <div className="header-dropdown-content avatar">
          <Link to="/settings">Settings</Link>
          <Link to="/" onClick={e => handleLogout(e)}>Log out</Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="header header-dark">
      <div className="header-left">
        <div className="nav-logo">
          <Link className="nav-light" to="/">CHINGU</Link>
        </div>
      </div>
      
      {user && renderPortalDropDown()}

      <div className="header-right">
        {user && renderAvatar()}
        {!user && <Link to="/login" className="header-btn green">LOG IN</Link>}
      </div>
    </div>
  )
}

export default graphql(currentUserQuery)(Header);