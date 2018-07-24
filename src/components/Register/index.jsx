import * as React from "react";
import { Redirect } from 'react-router-dom';
import { chinguApplicationData } from './chinguApplication.data';
import { renderQAs } from '../FormCreator/answerCreators';
import './Register.css';
import '../FormCreator/FormCreator.css';
import Error from '../Error/Error';
import Loading from '../Loader/Loader';
import Store from '../../AppGlobalStore';
import { REGISTER_USER, AUTH_MUTATION } from './graphql/mutations';
import SuccessForm from '../Success/Success';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      errorMessage: '',
      success: false,
      code: new URLSearchParams(window.location.search).get('code'),
      201: '', // email
      202: new Set(), // exciting about Chingu
      203: '', // value
      204: '', // country
      205: new Date().getTimezoneOffset(), // timezone // TODO: preselect the timezone using this.state[205]
      206: '',
    }
  }

  componentDidMount = () => {
    console.log('in component to mount!');
    Store.registerStateChangeListener(this.globalStoreChanged);
    if (!window.localStorage.getItem("token")) {
      console.log('dont have a token!');
      this.authUser();
    }
  }

  globalStoreChanged = (prevState, newState) => {
    this.render();
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading })
  }

  errorHandling = (err) => {
    this.setState({error: true, errorMessage: err})
  }

  authUser = () => {
    Store.mutations.authUser(
      this.toggleLoading,
      this.errorHandling,
      { code: this.state.code },
      AUTH_MUTATION
    )
      .then(data  => {
        window.localStorage.setItem("token", data.userAuthGithub);
        Store.updateGlobalState('id', data.id)
      })
      .catch(err => console.log(err));
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

  onSubmit = () => {
    const user_data = {
      email: this.state[201],
      country: this.state[204],
      timezone: this.state[205]
    };

    const application_data = {
      exciting_about_chingu: this.state[202],
      value_of_chingu: this.state[203],
    };

    Store.mutations.createUser(
      this.toggleLoading,
      this.errorHandling,
      { user_data, application_data },
      REGISTER_USER
    )
      .then(() => this.setState({ success: true }))
  }

  render() {
    return (
      this.state.code
        ? <React.Fragment>
          {this.state.loading ? <Loading /> : null}
          {this.state.errorMessage !== "" ? <Error goBack={"/register"} error={this.state.errorMessage} /> : null}
          <div className="chingu-application-container">
            <div className="chingu-application-modal">
              {this.state.success
                ? <SuccessForm />
                : <React.Fragment>
                  <div className="chingu-application-title">New User Onboarding Survey</div>
                  {renderQAs(chinguApplicationData, this.onFormChange, this.state)}
                  <button onClick={() => this.onSubmit()} className="chingu-application-btn">Save</button>
                </React.Fragment>
              }
            </div>
          </div>
        </React.Fragment>
        : <Redirect to='/login' />
    )
  }
}

export default Register;