![Image alt text](https://i.imgur.com/Bbtlvom.png)

## Introduction
Chingu.io is a web app created with React, Apollo Client and GraphQL to interface with the Chingu API (Node/PostgreSQL). Chingu is a global collaboration platform and coding-cohort generator. We connect motivated learners with shared goals to learn, help and build together. 

## Contributors
* [Vampiire (Full Stack Web Dev)](https://github.com/the-vampiire)
* [Francesca Sadikin (Front-End Web Dev and Designer)](https://github.com/serpient)
* [Tony Luo (Front-End Web Dev)](https://github.com/luoto)


## First Time Project Setup
```
git clone https://github.com/luoto/chingu-frontend.git
git remote add upstream https://github.com/luoto/chingu-frontend.git
npm install
cd chingu-frontend/
npm start
```
## Testing
- To runs tests use the command `npm test`.
- Use [Postman](https://www.getpostman.com/) app as an alternate/concurrent option for tests

## Additional Documentation 
- [Git Workflow](https://project-match.gitbook.io/project-match/pull-request-guide)
- [Git Pull Requests](https://project-match.gitbook.io/project-match/git-pull-request-guide)

## Testing GraphQL Queries & Mutations in the Playground
- head to the [Chingu API Playground](https://api.chingu.io/graphql)
- test your query and mutations against the schema
- make sure to include your authorization token in the HTTP HEADERS section (on the bottom of the playgorund page). To retrieve your authorization token:
1. Sign in to your chingu account
2. Inspect any chingu page and head to the application tab
3. Look under your Local Storage tab and you should see a "token" saved there
4. Copy the token, and paste it into the HTTP HEADER section like the below code. For example, if your code is 123456, then it should be written as so:
```
{
  Authorization: "Bearer 123456"
}
```
## Creating Basic Queries & Mutations with ApolloConsumer
ApolloConsumer can be nicely integrated into a React component to receive data from queries and make no-response back mutations.
Here's an example
```
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
mutation userRegister($input:JSON!){
  submitChinguApplicationForm(input:$input)
}
`
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      201: '',
      202: new Set(),
      203: '',
      204: '',
      205: '',
      code: new URLSearchParams(window.location.search).get('code')
    }
  }

  userAuth = (client) => {
    // this function is posting the github auth
    // then receiving data (the token), which is stored in local storage
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

   // this is another mutation function that receives client (which is passed in through the render function , see line 126)
  onSubmit = (client) => {
    let input = {
      email: this.state[201],
      excitingAboutChingu: this.state[202],
      valueOfChinguToUser: this.state[203],
      country: this.state[204],
      timezone: this.state[205]
    }
    client
    .mutate({ mutation: REGISTER_USER, variables: { input: input } })
    .then(/*show success screen*/)
    .catch(console.error);
  }

  render() {
    return (
      this.state.code ?
        <ApolloConsumer>
          {(client) => {
            this.userAuth(client);
            return (
              <div className="chingu-application-container">
                <div className="chingu-application-modal">
                  <div className="chingu-application-title">New User Onboarding Survey</div>
                  {renderQAs(chinguApplicationData, this.onFormChange, this.state)}
                  <button onClick={this.onSubmit(client)} className="chingu-application-btn">Save</button>
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
```
## Creating Mutation Components
What's the difference between using ApolloConsumer and a Mutation component for making mutations to the database?
Essentially, if you are making a mutation and expecting to render the data that comes back, then you may want to use a mutation component. 
However, if you are posting data and not expecting data back (aka, like posting form data), then it may be easier and cleaner to just use ApolloConsumer.
Here's a basic example of a Mutation Component which is wrapping a submit button. This component will then be inserted into its parent component.
```
const REGISTER_USER = gql`
mutation userRegister($input:JSON!){
  submitChinguApplicationForm(input:$input)
}
`
const RegisterUserMutation = () => {
  let input;
  return (
    <Mutation mutation={REGISTER_USER}>
      {(registerUser, { data }) => {
            <button
              onClick={e => {
                e.preventDefault();
                registerUser({ variables: {input: {} } });
              }}
              className="chingu-application-btn"
            >
              Save
          </button>
      }}
    </Mutation>
  )
}
```
