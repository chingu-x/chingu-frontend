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
          id="headerDropDown" 
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

  const renderAuthButtons = () => {
    let buttons
    
    if (user) {
      buttons = <React.Fragment>
        <Link 
          to="/" 
          className="header-btn grey" 
          onClick={e => handleLogout(e)}
        >
          LOG OUT
        </Link>
        <img className="avatar" src={user.avatar} alt="user avatar"/>
      </React.Fragment>
    } else {
      buttons = <Link to="/login" className="header-btn green">LOG IN</Link>
    }
    
    return <div className="header-right">{buttons}</div>
  }
  
  
    return (
      <div className="header header-dark">
        <div className="header-left">
          <div className="nav-logo">
            <Link className="nav-light" to="/">CHINGU</Link>
          </div>
        </div>
        {user && renderPortalDropDown()}
        {renderAuthButtons()}
      </div>
    )
}

export default graphql(currentUserQuery)(Header);