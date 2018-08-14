import React from "react";

import './Login.css';
import WithToken from "./components/WithToken";
import WithoutToken from "./components/WithoutToken";
import { Redirect } from "react-router-dom"

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

const Login = ({ queryString }) => localStorage.token ? <Redirect to="/profile" /> : <WithoutToken queryString={queryString} />

export default Login;
