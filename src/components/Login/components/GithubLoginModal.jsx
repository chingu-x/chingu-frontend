import React from 'react';
import { clientID } from 'config/keys';

const GithubLoginModal = () => {
  const githubAuthURL = `
  https://github.com/login/oauth/authorize?client_id=${clientID}&scope=public_repo
  `;
  // TODO: process.env for API and base client URL flip on dev / prod (default prod)
  return (
    <div className='login-box'>
      <div className='login-title'>Github Authentication</div>
      <a className='login-link'         href={githubAuthURL}
      >
        <button className='github-auth'>
          <img alt='github-icon' className='github-icon' src='https://i.imgur.com/UBZgVgQ.png' />
          Log in with Github
        </button>
      </a>
    </div>
  );
};

export default GithubLoginModal;
