import React from "react";
import './Login.css';
// TODO: add state generator
//   generate state and store in local storage
//   on redirect confirm state match and remove

const Login = () => (
  <div className="login-container">
    <div className="login-box">
      <div className="login-title">Github Authentication</div>
      <a
        className="github-auth"
        href={`https://github.com/login/oauth/authorize?client_id=e015fd9cc874fa5a34bf`}
      >
        <img 
          className="github-icon" 
          src={'https://i.imgur.com/UBZgVgQ.png'} 
          alt="github-icon" 
        />
        Log in with Github
      </a>
    </div>
  </div>
);

export default Login;
