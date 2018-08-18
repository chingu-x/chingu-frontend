import * as React from "react"
import { Redirect } from "react-router-dom"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import getUser from "../../../queries/getAuthedUser"

import Loader from "../../Loader/Loader"
import Error from "../../Error/Error"
import Landing from "../../Landing"

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

// TODO: Query splitting for faster auth: Initially fetch only id, username, avatar, status
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


const AuthenticateWithGithub = ({ code, prevPath }) => (
  <Mutation
    mutation={userAuthGithub}
    variables={{ code }}
    update={(store, { data: { userAuthGithub } }) => {
      // TODO: store.writeFragment 
      store.writeQuery({
        query: getUser,
        data: userAuthGithub.user
      })
    }
    }
  >
    {(authenticate, { called, data, error, loading, client }) => {
      // TODO: Fix state update error on login
      console.log("ghAuth status:", { called, loading, error, data })

      if (loading) return <Loader background="white" />
      if (error) return <Error error={error.message} goBack="/login" />


      if (data) {
        const {
          userAuthGithub: { user, access_token }
        } = data
        window.localStorage.setItem("token", access_token)
        window.localStorage.setItem(
          "store",
          JSON.stringify({ version: 5, user })
        )
        // TODO: write to link state
        // client.writeData({data: {user: {__typename: "User", ...data.user}}})
        // const {redirect} = qs.parse(queryString);
        return (
          prevPath
            ? <Redirect to={prevPath} />
            : redirectSelector(user)
        );
      }

      // if (code) {
      //   // const { code } = qs.parse(queryString)
      //   authenticate({ variables: { code } })
      // }
      authenticate({ variables: { code } })

      // return (
      //   <GithubLoginModal
      //     clientID="e015fd9cc874fa5a34bf" queryString={queryString}
      //   />
      // )
      return null
    }}
  </Mutation>
)

export default AuthenticateWithGithub
