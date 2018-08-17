import * as React from "react"
import { Redirect } from "react-router-dom"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import qs from "query-string"

import Loading from "../../Loader/Loader"
import Error from "../../Error/Error"

// -- UTILITIES -- //
const redirectSelector = ({ status }) => {
  let path
  switch (status) {
    case "new_user":
      path = "/register"
      break
    case "profile_incomplete":
      path = "/profile/update"
      break
    case "profile_complete":
      path = "/profile"
      break
    default:
      path = "/"
      break
  }
  return <Redirect to={path} />
}

const storeToken = token => window.localStorage.setItem("token", token)

// -- MUTATION -- //
const userAuthGithub = gql`
  mutation authUser($code: String!) {
    userAuthGithub(code: $code) {
      user {
        id
        avatar
        username
        status
        background
        interests
        coding_history
        country
        cohorts {
          id
          status
          start_date
          end_date
          members {
            status
            user {
              username
            }
          }
        }
        teams {
          id
          title
          standups {
            progress_sentiment
            expiration
          }
          cohort {
            id
            title
            start_date
            end_date
            status
          }
        }
      }
      access_token
    }
  }
`

// -- COMPONENTS -- //
// TODO: refactor styles
const GithubLoginModal = ({ clientID }) => (
  <div className="login-box" onClick={e => e.stopPropagation()}>
    <div className="login-title">Github Authentication</div>
    <a
      className="login-link"
      href={`https://github.com/login/oauth/authorize?client_id=${clientID}`}>
      <button className="github-auth">
        <img
          alt="github-icon"
          className="github-icon"
          src={"https://i.imgur.com/UBZgVgQ.png"}
        />
        Log in with Github
      </button>
    </a>
  </div>
)

const WithoutToken = ({ queryString }) => (
  <Mutation mutation={userAuthGithub}>
    {(authenticate, { data, error, loading, client }) => {
      console.log("Logging in without token")
      if (loading) return <Loading />
      if (error) return <Error error={error.message} goBack="/login" />
      if (data) {
        const {
          userAuthGithub: { user, access_token }
        } = data
        storeToken(access_token)
        // TODO: write to link state when implemented
        // client.writeData({ data: { user: {__typename: "User", ...data.user}}})
        // Unnecessary ? App fetches user on reload.
        window.localStorage.setItem(
          "store",
          JSON.stringify({ version: 5, user })
        )
        // TODO: write to link state
        return redirectSelector(user)
      }

      if (queryString) {
        const { code } = qs.parse(queryString)
        authenticate({ variables: { code } })
      }
      return <GithubLoginModal clientID="e015fd9cc874fa5a34bf" />
    }}
  </Mutation>
)

export default WithoutToken
