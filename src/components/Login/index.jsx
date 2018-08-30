import React from "react"
import { withRouter } from "react-router-dom"
import qs from "query-string"
import { gql } from "apollo-boost"
// import AuthenticateWithGithub from "./components/GithubAuth";
import { client } from "../../index"
import Loader from "../Loader"
import Error from "../Error"
import "./Login.css"

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

class Login extends React.Component {
  state = { error: null }

  async componentDidMount() {
    const { token, redirect } = localStorage
    const { queryString, history } = this.props
    const { code } = qs.parse(queryString)

    /**
     * IF token found or no code provided, redirect to /profile
     * /profile will render on token or show login modal without token
     */
    if (token || !code) history.replace("/profile")

    // Continue to auth
    const { data, error } = await client.mutate({
      mutation: userAuthGithub,
      variables: { code }
    })

    if (error) this.setState({ error: error.message })

    const {
      userAuthGithub: { user, access_token }
    } = data
    // Save new access_token
    localStorage.token = access_token

    // Redirect to pre-login navigated route or /feed
    history.push(redirect || "/newsfeed")
  }

  render = () => this.state.error
    ? <Error error={this.state.error} goBack="/login" />
    : <Loader />
}

export default withRouter(Login)
