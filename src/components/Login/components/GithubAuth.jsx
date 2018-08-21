import * as React from "react"
import { Redirect } from "react-router-dom"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
// import Loader from "../../Loader"
import Error from "../../Error"
import toggleLoader from "../../utilities/toggleLoader"

// // -- UTILITIES -- //
const loginRedirectSwitch = {
  "new_user": "/register",
  "profile_incomplete": "/profile/update",
  "profile_complete": "/profile",
}

// -- MUTATION -- //
const userAuthGithub = gql`
  mutation authUser($code: String!) {
    userAuthGithub(code: $code) {
      access_token
      user {
        id
        status
      }
    }
  }
`

/**
 * NOTES
 * Authenticates with Github
 * Saves access_token to localStorage.token
 * 
 * // TODO: Svae user to localStorage.store ===
 * // TODO: Receive prevPath string for post-login redirect
 */

const AuthenticateWithGithub = ({ code, prevPath }) => (
  <Mutation
    mutation={userAuthGithub}
    variables={{ code }}
  >
    {(authenticate, { data, error, loading }) => {
      // TODO: Fix state update error on login
      toggleLoader(loading)
      if (loading) return null // TODO: Remove
      if (error) return <Error error={error.message} goBack="/login" />
      if (data) {
        const {
          userAuthGithub: { user, access_token }
        } = data
        window.localStorage.setItem("token", access_token)

        // window.localStorage.setItem(
        //   "store",
        //   JSON.stringify({ version: 5, user })
        // )

        return (
          prevPath
            ? <Redirect to={prevPath} />
            : <Redirect to={loginRedirectSwitch[user.status] || "/"} />
        );
      }

      authenticate({ variables: { code } })
      return null
    }}
  </Mutation>
)

export default AuthenticateWithGithub
