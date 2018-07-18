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
      .mutate({ mutation: authMutation, variables: { code: this.state.code }})
      .then(console.log)
      .catch(console.error);
    // if (res.ok) {
    //   const { data: { userGithubAuth: { token } } } = res;
    //   window.localStorage.setItem('token', token);
    // }
  }

  render() {
    if (this.state.code) {
      return (
        <ApolloConsumer>
          { client => {
            this.userAuth(client);
            return <div>got it</div>
          } }
        </ApolloConsumer>
      )
    }

    return (<div className="login-box">
    <h1>CHINGU</h1>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${'e015fd9cc874fa5a34bf'}&state=ok`}
      >
        <button>
          Sign in bro
        </button>
      </a>
  </div>)
  }
}

// const Login = () => {
//   return (
//     <div className="login">
//       <div className="login-box">
//       { console.log(ApolloConsumer) }
//         <h1>CHINGU</h1>
//         <a
//           href={`https://github.com/login/oauth/authorize?client_id=${'e015fd9cc874fa5a34bf'}`}
//         >Sign in with GitHub</a>
//       </div>
//     </div>
//   );
// };

export default Login;
