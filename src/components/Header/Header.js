import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";

import currentUserQuery from "../../queries/currentUserQuery";

class Header extends Component {
  state = {};

  handleLogout(e){
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.location = "/";
  };

  renderRightNav() {
    let loggedIn = window.localStorage.token;
    let { error } = this.props.data;
    if (error) {
      //do nothing.  this will throw an error when not logged in.  apollo client known issue.
      //this if statement will clear it out of the console for now.
    };
    if (!!loggedIn) {
      return [
        <Link key="1" className={window.location.pathname === "/" ? "btn btn-light" : "btn"} to="/" onClick={e => this.handleLogout(e)}>
          Log Out
        </Link>,
        <Link key="2" className={window.location.pathname === "/" ? "btn btn-light" : "btn"} to="/myaccount" >
          <i className="far fa-user fa-2x" />
        </Link>
      ];
    } else {
      return [
        <Link key="1" className={window.location.pathname === "/" ? "btn btn-light" : "btn"} to="/signup">
          Sign Up
        </Link>,
        <Link key="2" className={window.location.pathname === "/" ? "btn btn-light" : "btn"} to="/login">
          Log In
        </Link>
      ];
    }
  }

  render() {
    return (
      <div className={window.location.pathname === "/" ? "header header-dark" : "header"}>
        <div className="header-left">
          <div className="nav-logo">
            <Link className={window.location.pathname === "/" ? "nav-light" : ""} to="/">CHINGU</Link>
          </div>
        </div>
        <div className="header-right">{this.renderRightNav()}</div>
      </div>
    );
  }
}

export default graphql(currentUserQuery)(Header);
