import * as React from "react";
import { Redirect } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import gql from "graphql-tag";

import authMutation from "../../mutations/authMutation";
import { chinguApplicationData } from './chinguApplication.data';
import { renderQAs } from '../FormCreator/answerCreators';
import './Register.css';
import '../FormCreator/FormCreator.css';

const REGISTER_USER = gql`
  mutation createUser($user_data: UserCreateInput!, $application_data: JSON!){
    createUser(user_data:$user_data, application_data:$application_data) {
      id
    }
  }
`
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      201: '', // email
      202: new Set(), // exciting about Chingu
      203: '', // value
      204: '', // country
      205: new Date().getTimezoneOffset(), // timezone
      206: '',
      code: new URLSearchParams(window.location.search).get('code')
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

  onSubmit = (client) => {
    const user_data = {
      email: this.state[201],
      country: this.state[204],
      timezone: this.state[205]
    };

    const application_data = {
      exciting_about_chingu: this.state[202],
      value_of_chingu: this.state[203],
    };

    client
      .mutate({
        mutation: REGISTER_USER,
        variables: { user_data, application_data },
      })
      .then(/*show success screen*/)
      .catch(console.error); // TODO: handle errors properly
  }

  render() {
      return (
      this.state.code ?
        <ApolloConsumer>
          {(client) => {
            // prevents userAuth from firing on component rendering once token is captured 
            if (!window.localStorage.getItem("token")) this.userAuth(client);
            
            // TODO: preselect the timezone using this.state[205]
            return (
              <div className="chingu-application-container">
                <div className="chingu-application-modal">
                  <div className="chingu-application-title">New User Onboarding Survey</div>
                  {renderQAs(chinguApplicationData, this.onFormChange, this.state)}
                  <button onClick={() => this.onSubmit(client)} className="chingu-application-btn">Save</button>
                </div>
              </div>
            );
          }}
        </ApolloConsumer>
        : <Redirect to='/login' />
    )
  }
}

export default Register;