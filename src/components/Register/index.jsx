import * as React from "react";
import { Redirect } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

import authMutation from "../../mutations/authMutation";
import { chinguApplicationData } from './chinguApplication.data';
import { renderQAs } from '../FormCreator/answerCreators';
import './Register.css';
import '../FormCreator/FormCreator.css';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      201: '',
      202: new Set(),
      203: '',
      204: '',
      205: '',
      code: new URLSearchParams(window.location.search).get('code'),
    }
  }

  userAuth = (client) => {
    // TODO: FUTURE - check 'state' from localstorage and clear before mutation
    // once we implement state passing
    client
      .mutate({ mutation: authMutation, variables: { code: this.state.code } })
      .then(({ data }) => window.localStorage.setItem("token", data.userAuthGithub))
      .catch(console.error); // TODO: handle errors properly
  }


  toggleValueInSet = (set, value) => {
    set.has(value) ? set.delete(value) : set.add(value);
    return set;
  }

  onFormChange = (e) => {
    const { name, value, type } = e.currentTarget;
    switch (type) {
      case 'checkbox':
        this.setState({ [name]: this.toggleValueInSet(this.state[name], value) });
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    // save to user profile
  }

  render() {
    return (
      this.state.code ?
      <ApolloConsumer>
          { (client) => {
              this.userAuth(client);
              return (
                <div className="chingu-application-container">
                <div className="chingu-application-modal">
                  <div className="chingu-application-title">New User Onboarding Survey</div>
                  {renderQAs(chinguApplicationData, this.onFormChange, this.state)}
                  <button onClick={e => this.onSubmit(e)} className="chingu-application-btn">Save</button>
                </div>
              </div>
              );
          } }
          </ApolloConsumer>
      : <Redirect to='/login' />  
      )
  }
}

export default Register;