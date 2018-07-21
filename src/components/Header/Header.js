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

const Header = () => {
  // TODO Get auth state from Context/Provider
  const auth = !!window.localStorage.getItem("token")
  
  const handleLogout = e => {
    e.preventDefault();
    console.log("Logging out");
    window.localStorage.removeItem("token"); 
    // TODO Update Context/Provider
    window.location = "/";
  };

  const renderPortalDropDown = () => {
    return <div style={{"color": "white"}}>PORTAL DROPDOWN</div>
  }

  const renderAuthButtons = () => {
    let button
    
    if (auth) {
      button = <Link 
        to="/" 
        className="btn btn-light" 
        onClick={e => handleLogout(e)}
      >
        Logout
      </Link>
    } else {
      button = <Link to="/login" className="btn btn-light">Login</Link>
    }
    
    return <div className="header-right">{button}</div>
  }
  
  
  return (
    <div className="header header-dark">
      <div className="header-left">
        <div className="nav-logo">
          <Link className="nav-light" to="/">CHINGU</Link>
        </div>
      </div>
      {auth && renderPortalDropDown()}
      {/* <div className="header-right">{this.renderRightNav()}</div> */}
      {renderAuthButtons()}
    </div>
  )
}

export default Header;