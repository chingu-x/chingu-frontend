import React from "react"
import { Route, Redirect } from "react-router-dom"
import isAuthed from "./checkAuth"

// Private route that renders login modal with landing page in backgrund if no token
// TODO: FIXME pathname and loginModal stuck over munal reload. How to clear .location.state ?
export default ({ component: Component, render: Render, ...props }) => (
  <Route {...props} render={props => {
    if (!isAuthed()) {
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