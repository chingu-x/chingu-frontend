import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";

import gql from "graphql-tag"; // TODO Remove TEMP

const Header = props => {
  const token = !!window.localStorage.getItem("token");

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
    const { user } = props.data
    let buttons
    
    if (token && user) {
      buttons = <React.Fragment>
        <Link 
          to="/" 
          className="header-btn grey" 
          onClick={e => handleLogout(e)}
        >
          LOG OUT
        </Link>
        {/* <Link className="btn btn-light" to="/"><i className="far fa-user fa-2x" /></Link> */}
        <img className="avatar big" src={user.avatar} alt="user avatar"/>
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
        {props.data.user && renderPortalDropDown()}
        {renderAuthButtons()}
      </div>
    )
}

// TODO remove TEMP
const tempUserQuery = gql`
  query currentUserQuery {
    user(user_id:1) {
      id,
      avatar,
      username
    }
  }
`;

export default graphql(tempUserQuery)(Header);