import React from "react"
import { Route, Redirect } from "react-router-dom"
import isAuthed from "./checkAuth"

// Private route that renders login modal with landing page in backgrund if no token
// TODO: implement better auth check
export default ({ component: Component, ...props }) => (
  <Route {...props} render={props => (
    isAuthed()
      ? <Component {...props} />
      : <Redirect to={{
        pathname: "/",
        state: {
          // Pass private route pathname to use in Github redirect after login
          from: props.location.pathname,
          loginModal: true
        }
      }} />
  )} />
)