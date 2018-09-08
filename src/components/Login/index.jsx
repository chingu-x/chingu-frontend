import React from "react"
import { gql } from "apollo-boost"
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
      }
    }
  }
`

class Login extends React.Component {
  state = { error: null }

  async componentDidMount() {
    const { token, redirect } = localStorage
    const queryParams = new URLSearchParams(this.props.location.search);
    const code = queryParams.get('code');

    /**
     * IF token found or no code provided, redirect to /profile
     * /profile will render on token or show login modal without token
     */
    if (token || !code) return this.props.history.replace("/profile")

    // Continue to auth
    const { data, error } = await client.mutate({
      mutation: userAuthGithub,
      variables: { code }
    })

    if (error) this.setState({ error: error.message })

    // Save new access_token and redirect to pre-login navigated route OR /newsfeed
    localStorage.token = data.userAuthGithub.access_token
    return this.props.history.push(redirect || "/newsfeed")
  }

  render = () => this.state.error
    ? <Error error={this.state.error} goBack="/login" />
    : <Loader />
}

export default Login
