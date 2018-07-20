import React from "react";
import { ApolloConsumer, renderToStringWithData } from "react-apollo";
import LoginForm from "./LoginForm";
// TODO: add state generator
  // generate state and store in local storage
  // on redirect confirm state match and remove

// class Login extends React.Component {
//   state = { code: null }
//   componentDidMount() {
//       const code = new URLSearchParams(window.location.search).get('code');
//       this.setState({ code });
//   }
//   render() {
//     return (
//       // TODO: use ApolloConsumer to make conditional mutation
//         // if code exists call mutation and redirect
//         // otherwise let user auth
//     )
//   }
// }

const Login = () => {
  return (
    <div className="login">
      <div className="login-box">
      { console.log(ApolloConsumer) }
        <h1>CHINGU</h1>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${'e015fd9cc874fa5a34bf'}`}
        >Sign in with GitHub</a>
      </div>
    </div>
  );
};

export default Login;
