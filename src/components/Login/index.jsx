import React from "react"
import { Redirect } from "react-router-dom"
import qs from "query-string"
import AuthenticateWithGithub from "./components/GithubAuth";
import "./Login.css"

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

/**
 * NOTES
 * /login route is only used by github callback (or manually).
 * If there is a code found in querystring, try to authenticate with Github.
 * Otherwise redirect to /profile which will show the Login modal. If authed, redirects to /profile.
 */

const Login = ({ queryString }) => {
  if (queryString) {
    var { code } = qs.parse(queryString)
    var { redirect } = qs.parse(queryString)
  }

  // TODO: Pass redirect queryString for post-login redirect
  return !localStorage.token && code
    ? <AuthenticateWithGithub code={code} />
    : <Redirect to="/profile" />
}

export default Login
