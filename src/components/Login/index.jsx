import React from "react";
import { Redirect } from "react-router-dom";
import Error from "../Error/Error"; //TODO: replace Error.jsx -> index.jsx for simpler export
import Loading from "../Loader/Loader";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import * as qs from "query-string";
import './Login.css';

// TODO: add state generator
//   generate state and store in local storage
//   on redirect confirm state match and remove

/**
 * Component exists on:
 *  - /login
 *  - GitHub redirects to /login?code='' 
 * 
 * Goal
 * - component to load displaying a LOGIN WITH GITHUB button
 * - login -> redirects user to GitHub auth page
 * - redirects back to Login component with 'code' qs param
 * 
 * - get code from url and initiate the userAuthGithub mutation
 * - retrive user and access_token from response payload
 * - store access_token in local storage
 * - redirect based on user status field
 *  - new_user -> Redirect to Register view
 *  - profile_complete -> Redirect to User portal view
 *  - [future] profile_incomplete -> Redirect to User update view
*/

// -- UTILITIES -- //
const redirectSelector = ({ status }) => {
  let path;
  switch (status) {
    case 'new_user':
      path = '/form/register';
      break;
    case 'profile_incomplete':
      path = '/profile/update';
      break;
    case 'profile_complete':
      path = '/profile';
      break;
    default:
      path = '/';
      break;
  }

  return <Redirect to={path} />
}

const storeToken = (token) => window.localStorage.setItem('token', token);

// -- COMPONENTS -- //
// TODO: refactor styles
const GithubLoginModal = ({ clientID }) => (
  <React.Fragment>
    <a className="login-container" href="/"></a>
    <div className="login-box">
      <div className="login-title">Github Authentication</div>
      <a className="login-link" href={`https://github.com/login/oauth/authorize?client_id=${clientID}`}>
        <button className="github-auth">
          <img alt="github-icon" className="github-icon" src={'https://i.imgur.com/UBZgVgQ.png'} />
          Log in with Github
        </button>
      </a>
    </div>
  </React.Fragment>
);

// -- MUTATION -- //
const userAuthGithub = gql`
  mutation authUser($code:String!) {
    userAuthGithub(code:$code) {
      user {
        id
        status
      }
      access_token
    }
  }
`;

const Login = ({ queryString }) => (
  <Mutation mutation={userAuthGithub}>
    {
      (authenticate, { data, error, loading }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error.message} goBack="/login" /> 
        if (data) {
          const { userAuthGithub: { user, access_token } } = data;
          storeToken(access_token);
          return redirectSelector(user);
        }
        
        if (queryString) {
          const { code } = qs.parse(queryString);
          authenticate({ variables: { code } });
        }
        return <GithubLoginModal clientID="e015fd9cc874fa5a34bf"/>
      } 
    }
  </Mutation>
);

export default Login;
