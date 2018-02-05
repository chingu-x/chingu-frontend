import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";

import currentUserQuery from "../../queries/currentUserQuery";
import "./Header.css";

class Header extends Component {
  state = {};

  handleLogout(e){
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.location = "/";
  };

  renderRightNav() {
    let loggedIn = window.localStorage.token;
    let { user, error } = this.props.data;
    if (error) {
      
    };
    if (!!loggedIn) {
      return [
        <Link key="1" className="btn" to="/" onClick={e => this.handleLogout(e)}>
          Log Out
        </Link>,
        <Link key="2" className="btn" to="/" >
          <i className="far fa-user fa-2x" />
        </Link>
      ];
    } else {
      return [
        <Link key="1" className="btn" to="/signup">
          Sign Up
        </Link>,
        <Link key="2" className="btn" to="/login">
          Log In
        </Link>
      ];
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header-left">
          <div className="nav-logo">
            <Link to="/">CHINGU</Link>
          </div>
        </div>
        <div className="header-right">{this.renderRightNav()}</div>
      </div>
    );
  }
}

export default graphql(currentUserQuery)(Header);
