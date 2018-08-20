import * as React from "react"
import { Redirect } from "react-router-dom"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import Loader from "../../Loader/Loader"
import Error from "../../Error/Error"
import Landing from "../../Landing"
import toggleLoader from "../../utilities/toggleLoader"

// // -- UTILITIES -- //
// const redirectSelector = ({ status }) => {
//   let path
//   switch (status) {
//     case "new_user":
//       path = "/register"
//       break
//     case "profile_incomplete":
//       path = "/profile/update"
//       break
//     case "profile_complete":
//       path = "/profile"
//       break
//     default:
//       path = "/"
//       break
//   }
//   return <Redirect to={path} />
// }


// TODO: Query splitting for faster auth: Initially fetch only id, username, avatar, status
// -- MUTATION -- //

// const userAuthGithub = gql`
//   mutation authUser($code: String!) {
//     userAuthGithub(code: $code) {
//       user {
//         id
//         username
//         avatar
//         country
//         status
//         background
//         interests
//         coding_history
//         cohorts {
//           id
//           title
//           status
//           start_date
//           end_date
//           members {
//             id
//             status
//             user {
//               username
//             }
//           }
//         }
//         teams {
//           id
//           title
//           standups {
//             progress_sentiment
//             expiration
//           }
//           cohort {
//             id
//             title
//             start_date
//             end_date
//             status
//           }
//         }
//       }
//       access_token
//     }
//   }
// `


const loginRedirectSwitch = {
  "new_user": "/register",
  "profile_incomplete": "/profile/update",
  "profile_complete": "/profile",
}

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
        // TODO: write to link state
        // client.writeData({data: {user: {__typename: "User", ...data.user}}})
        // const {redirect} = qs.parse(queryString);
        return (
          prevPath
            ? <Redirect to={prevPath} />
            : <Redirect to={loginRedirectSwitch[user.status] || "/"} />
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
