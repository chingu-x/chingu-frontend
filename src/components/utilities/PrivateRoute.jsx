import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"
import Error from "../Error"
import toggleGlobalLoader from "./toggleGlobalLoader"

const userStatusQuery = gql`
 query getUserStatus {
   user {
     id
     status
   }
 }
`

// Private route that renders login modal with landing page in backgrund if no token
// TODO: FIXME pathname and loginModal stuck over munal reload. How to clear .location.state ?

/**
 * NOTES: Private Route wrapper
 * If no token found, renders login modal on landing page
 */

export default ({ component: Component, render: Render, ...props }) => {
  const currentPath = props.location.pathname
  return (
    <Route {...props} render={props => {
      if (!localStorage.token) {
        localStorage.redirect = currentPath
        return <Redirect to="/" /> // Landing age will check for localStorage.redirect and open a login modal
      }
      // else if (!!Render) return <Render {...props} />
      // else return <Component {...props} />

      return (
        <Query query={userStatusQuery}>
          {
            ({ loading, error, data }) => {
              if (error) return <Error error={error.message} />
              toggleGlobalLoader(loading)
              if (!data.user) return null

              const { status } = data.user
              // const status = "new_user" // TODO: Remove - hardcoded for testing
              if (status === "new_user" && currentPath !== "/register") {
                return <Redirect to="/register" />
              }
              //TODO: 
              // if (status === "profile_incomplete" && currentPath !== /profile/update") {
              //   return Redirect to = "/profile/update"
              // }

              if (!!Render) return <Render {...props} />

              return <Component {...props} />
            }
          }
        </Query>
      )
    }} />
  )
}