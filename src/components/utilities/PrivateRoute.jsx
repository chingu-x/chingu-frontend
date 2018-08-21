import React from "react"
import { Route, Redirect } from "react-router-dom"

// Private route that renders login modal with landing page in backgrund if no token
// TODO: FIXME pathname and loginModal stuck over munal reload. How to clear .location.state ?

/**
 * NOTES: Private Route wrapper
 * If no token found, renders login modal on landing page
 * Also passes location.pathname to redirected route to use with pot-login redirect
 * 
 * TODO: FIXME .location.state persists over reloads. How to clear it?
 */

export default ({ component: Component, render: Render, ...props }) => (
  <Route {...props} render={props => {
    if (!localStorage.token) {
      return <Redirect to={{
        pathname: "/",
        state: { from: props.location.pathname, loginModal: true },
      }} />
    }
    else if (!!Render) return <Render {...props} />
    else return <Component {...props} />
  }
  } />
) 