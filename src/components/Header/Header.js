// import * as React from 'react';
// import { Link } from "react-router-dom";
// import { graphql } from "react-apollo";

// import currentUserQuery from "../../queries/currentUserQuery";

// class Header extends React.Component {
//   state = {};

  // handleLogout(e){
  //   e.preventDefault();
  //   window.localStorage.removeItem("token");
  //   window.location = "/";
  // };

//   // Right nav link link to Dash is disabled while image structure being set up by backend team.
//   // Icon will need to be redirected to /myaccount once complete.
//   renderRightNav() {
//     let loggedIn = window.localStorage.token, loginMenuItems;
//     let { error } = this.props.data;

//     let menu = [
//       <a key="1" href="https://medium.com/chingu" className={window.location.pathname === "/" ? "btn btn-light" : "btn"}>
//         Blog
//       </a>
//     ];

//     if (error) {
//       //do nothing.  this will throw an error when not logged in.  apollo client known issue.
//       //this if statement will clear it out of the console for now.
//     };

//     if (!!loggedIn) {
//       loginMenuItems = [
//         <Link key="2" className={window.location.pathname === "/" ? "btn btn-light" : "btn"} to="/" onClick={e => this.handleLogout(e)}>
//           Log Out
//         </Link>,
//         <Link key="3" className={window.location.pathname === "/" ? "btn btn-light" : "btn"} to="/" >
//           <i className="far fa-user fa-2x" />
//         </Link>
//       ];
//     } else {
//       loginMenuItems = [
//         <Link key="2" className={window.location.pathname === "/" ? "btn btn-light" : "btn"} to="/signup">
//           Sign Up
//         </Link>,
//         <Link key="3" className={window.location.pathname === "/" ? "btn btn-light" : "btn"} to="/login">
//           Log In
//         </Link>
//       ];
//     }

//     menu.push(...loginMenuItems);

//     return menu
//   }

//   render() {
//     return (
//       <div className={window.location.pathname === "/" ? "header header-dark" : "header"}>
//         <div className="header-left">
//           <div className="nav-logo">
//             <Link className={window.location.pathname === "/" ? "nav-light" : ""} to="/">CHINGU</Link>
//           </div>
//         </div>
//         <div className="header-right">{this.renderRightNav()}</div>
//       </div>
//     );
//   }
// }

// export default graphql(currentUserQuery)(Header);


import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  state = {
    auth: !!window.localStorage.getItem("token"), // FIXME
    dropDownShowing: false, // TODO remove - dropdown using CSS :hover
  }

  // componentDidMount() {
  //   const auth = !!window.localStorage.getItem("token")

  //   if (auth !== this.state.auth) {
  //     this.setState({ auth })
  //   }
  // }
  
  handleLogout = e => {
    e.preventDefault();
    console.log("Logging out");
    window.localStorage.removeItem("token");
    // TODO Update App auth state

    window.location = "/";
  };

  toggleDropDown = () => this.setState({ dropDownShowing: !this.state.dropDownShowing })

  renderPortalDropDown = () => {
    return (
      <div className="header-dropdown">
        <button className="header-portal-btn" onClick={this.toggleDropDown}>
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

  renderAuthButtons = () => {
    let buttons
    
    if (this.state.auth) {
      buttons = <React.Fragment>
        <Link 
          to="/" 
          className="btn btn-light" 
          onClick={e => this.handleLogout(e)}
        >
          Logout
        </Link>
        <Link className="btn btn-light" to="/"><i className="far fa-user fa-2x" /></Link>
      </React.Fragment>
    } else {
      buttons = <Link to="/login" className="btn btn-light">Login</Link>
    }
    
    return <div className="header-right">{buttons}</div>
  }
  
  
  render() {
    return (
      <div className="header header-dark">
        <div className="header-left">
          <div className="nav-logo">
            <Link className="nav-light" to="/">CHINGU</Link>
          </div>
        </div>
        {this.state.auth && this.renderPortalDropDown()}
        {/* <div className="header-right">{this.renderRightNav()}</div> */}
        {this.renderAuthButtons()}
      </div>
    )
  }
}

export default Header;