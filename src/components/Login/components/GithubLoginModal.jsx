import React from "react"

// TODO: refactor styles
const GithubLoginModal = ({
  clientID = "e015fd9cc874fa5a34bf"
}) => {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientID}`;
  // TODO: process.env for API and base client URL flip on dev / prod (default prod)
  // const redirectBase = `${procescs.env.CLIENT_URL}/login`;
  const redirectBase = "https://localhost:3000/login"
  return (
    <div className="login-box" onClick={e => e.stopPropagation()} >
      <div className="login-title">Github Authentication</div>
      <a
        className="login-link"
        href={githubAuthURL}>
        <button className="github-auth">
          <img
            alt="github-icon"
            className="github-icon"
            src={"https://i.imgur.com/UBZgVgQ.png"}
          />
          Log in with Github
      </button>
      </a>
    </div >
  )
};

export default GithubLoginModal