import * as React from "react";
import { Redirect } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

import authMutation from "../../mutations/authMutation";
import { chinguApplicationData } from './chinguApplication.data';
import { renderQAs } from '../FormCreator/answerCreators';
import '../VoyageApplication/VoyageApplication.css';
import './ChinguApplication.css';
// TODO: rename this component to Register to match route name
class ChinguApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            1: '',
            2: new Set(),
            3: '',
            4: '',
            5: '',
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
        console.log(this.state)
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
        console.log(this.state);
    }

    render() {
        if (this.state.code) {
            return (
              <ApolloConsumer> {
                (client) => {
                  this.userAuth(client);

                  return (
                    <div className="chingu-application-container">
                        <div className="chingu-application-modal">
                            {renderQAs(chinguApplicationData, this.onFormChange, this.state)}
                        </div>
                    </div>
                  );
                }
              }
              </ApolloConsumer>
            )
        } return <Redirect to='/login' /> // user manually navigated to /register -> redirect to login
    }
}

export default ChinguApplication;