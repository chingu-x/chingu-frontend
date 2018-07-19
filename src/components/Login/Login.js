import React from "react";
import { ApolloConsumer } from "react-apollo";
import authMutation from "../../mutations/authMutation";

// TODO: add state generator
//   generate state and store in local storage
//   on redirect confirm state match and remove

class Login extends React.Component {
  state = { code: null }
  componentDidMount() {
    const code = new URLSearchParams(window.location.search).get('code');
    this.setState({ code });
  }

  userAuth = (client) => {
    // TODO: check state and clear before mutation
    client
      .mutate({ mutation: authMutation, variables: { code: this.state.code } })
      .then(({ data }) => window.localStorage.setItem("token", data.userAuthGithub))
      .catch(console.error);
  }

  render() {
    if (this.state.code) {
      return (
        <ApolloConsumer>
          {client => {
            this.userAuth(client);
            return <div>got it</div>
          }}
        </ApolloConsumer>
      )
    }

    return (
      <div className="login-box">
        <div className="login-title">Github Authentication</div>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=e015fd9cc874fa5a34bf`}
        >
         <button className="github-auth"><img src={require('https://i.imgur.com/UBZgVgQ.png')} />Log in with Github</button>
        </a>
      </div>
  );
};

export default Login;
