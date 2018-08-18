import React from "react"

import "./Login.css"
import WithToken from "./components/WithToken"
import WithoutToken from "./components/WithoutToken"
import { Redirect } from "react-router-dom"
import Landing from "../Landing"
import qs from "query-string"
import AuthenticateWithGithub from "./components/GithubAuth";

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

// -- MUTATION -- //
// const Login = ({ queryString }) => (
//   window.localStorage.getItem('token') ?
//     <WithToken /> :
//     <WithoutToken queryString={queryString} />
// );

/**
 * /login route is only loaded by github callback (or manually)
 * If there is a code found in querystring, try to authenticate with Github.
 * Otherwise redirect to /profile which will render the UserPage or show the login modal depending localStorage.token
 */

const Login = ({ queryString }) => {
  if (queryString) {
    var { code } = qs.parse(queryString)
    var { redirect } = qs.parse(queryString)
  }

  return !localStorage.token && code
    ? <AuthenticateWithGithub code={code} prevPath={redirect} />
    : <Redirect to="/profile" />
}

export default Login
