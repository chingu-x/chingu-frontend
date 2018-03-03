import _ from "lodash";
import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import SignUpFormItem from "./SignUpFormItem";
import registerUser from "../../mutations/registerUserMutation";
import getCountries from "../../queries/getCountries";
// import userQuery from "../../queries/userQuery";
import formFields from "./formFields";

class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    github: "",
    first_name: "",
    last_name: "",
    country_id: "",
    formErrors: {
      email: "",
      password: "",
      passwordVerify: "",
      username: "",
      github: "",
      first_name: "",
      last_name: "",
      country_id: ""
    },
    emailValid: false,
    passwordValid: false,
    passwordMatch: false,
    usernameValid: false,
    firstNameValid: false,
    lastNameValid: false,
    githubValid: false,
    countryValid: false,
    formValid: false
  };

  handleOnBlur(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  }

  handleOnSelectChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  }

  handleOnSubmit(e) {
    e.preventDefault();

    let {
      email,
      password,
      username,
      github,
      first_name,
      last_name,
      country_id
    } = this.state;

    let github_url = "https://github.com/" + github;
    email = email.toLowerCase();
    username = username.toLowerCase();

    this.props
      .mutate({
        variables: {
          email,
          first_name,
          last_name,
          github_url,
          password,
          username,
          country_id
        }
      })
      .then(({ data }) => {
        window.localStorage.setItem("token", data.createUser.jwt);
        // window.location = "/user/" + data.createUser.user.username;
        window.location = "/slack";
      })
      .catch(err => {
        console.error(err);
      });

    this.signUpForm.reset();
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let passwordMatch = this.state.passwordMatch;
    let usernameValid = this.state.usernameValid;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let githubValid = this.state.githubValid;
    let countryValid = this.state.countryValid;
    const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const reAlphaNum = /^[a-zA-Z0-9-\s]*$/;
    const reAlphaNumHy = /^[a-zA-Z0-9-_]*$/;

    switch (fieldName) {
      case "email":
        emailValid = value.match(reEmail) && value.length > 0;
        fieldValidationErrors.email = emailValid ? "" : "Error";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : "Error";
        break;
      case "passwordVerify":
        passwordMatch = value.length >= 6 && value === this.state.password;
        fieldValidationErrors.passwordVerify = passwordMatch ? "" : "Error";
        break;
      case "username":
        usernameValid = value.match(reAlphaNumHy) && value.length >= 4;
        fieldValidationErrors.username = usernameValid ? "" : "Error";
        break;
      case "first_name":
        firstNameValid = value.match(reAlphaNum) && value.length > 0;
        fieldValidationErrors.first_name = firstNameValid ? "" : "Error";
        break;
      case "last_name":
        lastNameValid = value.match(reAlphaNum) && value.length > 0;
        fieldValidationErrors.last_name = lastNameValid ? "" : "Error";
        break;
      case "github":
        githubValid = value.match(reAlphaNumHy) && value.length > 0;
        fieldValidationErrors.github = githubValid ? "" : "Error";
        break;
      case "country_id":
        countryValid = !!value;
        fieldValidationErrors.country_id = countryValid ? "" : "Error";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        passwordMatch: passwordMatch,
        usernameValid: usernameValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        githubValid: githubValid,
        countryValid: countryValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordMatch &&
        this.state.usernameValid &&
        this.state.githubValid &&
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.countryValid
    });
  }

  renderFields() {
    return _.map(
      formFields,
      ({ name, type, placeholder, iconName, errorMessage }) => {
        return (
          <SignUpFormItem
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            errorMessage={errorMessage}
            onBlur={e => this.handleOnBlur(e)}
            formErrors={this.state.formErrors}
            iconName={iconName}
          />
        );
      }
    );
  }

  renderCountryOptions() {
    if (!!this.props.countries.countries) {
      const { countries } = this.props.countries;
      return countries.map(({ id, name }) => (
        <option key={id} name="country_id" value={id}>
          {name}
        </option>
      ));
    }
  }

  render() {
    console.log(this.props)
    return (
      <form
        className="signup-form"
        ref={input => (this.signUpForm = input)}
        onSubmit={e => this.handleOnSubmit(e)}
      >
        {this.renderFields()}
        <div className="signup-select-box">
          <select
            name="country_id"
            onChange={e => this.handleOnSelectChange(e)}
            onBlur={e => this.handleOnBlur(e)}
          >
            <option />
            {this.renderCountryOptions()}
          </select>
          <i className="far fa-flag select-flag" />
          {this.state.formErrors.country ? (
            <p className="errorMessage">You must include a country.</p>
          ) : (
            ""
          )}
        </div>
        <button
          className="submitBtn"
          type="submit"
        >
          register
        </button>
      </form>
    );
  }
}

// const test = gql`
//   query test($username: String!) {
//     user(username: $username) {
//       first_name
//     }
//   }
// `;

// const testQuery = graphql(test, {
//   options: {
//     variables: {
//       username: "vannya"
//     }
//   },
// })(SignUpForm);


export default compose(
  graphql(registerUser),
  graphql(getCountries, {
    name: "countries",
    options: {
      variables: {
        limit: 250
      }
    }
  })
)(SignUpForm);
