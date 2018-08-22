import React from "react"
import { Route, Redirect } from "react-router-dom"

// Private route that renders login modal with landing page in backgrund if no token
// TODO: FIXME pathname and loginModal stuck over munal reload. How to clear .location.state ?

/**
 * NOTES: Private Route wrapper
 * If no token found, renders login modal on landing page
 */

export default ({ component: Component, render: Render, ...props }) => (
  <Route {...props} render={props => {
    if (!localStorage.token) {
      localStorage.redirect = props.location.pathname
      return <Redirect to="/" />
    }
    else if (!!Render) return <Render {...props} />
    else return <Component {...props} />
  }
  } />
) 