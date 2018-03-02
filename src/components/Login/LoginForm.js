import _ from "lodash";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import LoginFormItem from "./LoginFormItem";
import userLogin from "../../mutations/loginMutation";
import loginFields from "./loginFields";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    formErrors: {
      email: "",
      password: ""
    },
    emailValid: false,
    passwordValid: false,
    formValid: false
  };

  handleOnBlur(e) {
    console.log(e.target)
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

  //To allow for submission without blurring off the last input
  handleOnChange(e) {
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
      password
    } = this.state;

    email = email.toLowerCase();

    this.props
      .mutate({
        variables: {
          email,
          password
        }
      })
      .then(({ data }) => {
        window.localStorage.setItem("token", data.signIn.jwt);
        window.location = "/user/" + data.signIn.user.username;
      })
      .catch(err => {
        console.error(err);
      });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    switch (fieldName) {
      case "email":
        emailValid = value.match(reEmail) && value.length > 0;
        fieldValidationErrors.email = emailValid ? "" : "Error";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : "Error";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid
    });
  }

  renderFields() {
    return _.map(
      loginFields,
      ({ name, type, placeholder, iconName, errorMessage }) => {
        return (
          <LoginFormItem
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            errorMessage={errorMessage}
            onBlur={e => this.handleOnBlur(e)}
            onChange={ name === "password" ? (e => this.handleOnChange(e)) : function(){} }
            formErrors={this.state.formErrors}
            iconName={iconName}
          />
        );
      }
    );
  }

  render() {
    return (
      <form
        className="login-form"
        ref={input => (this.signUpForm = input)}
        onSubmit={e => this.handleOnSubmit(e)}
      >
        {this.renderFields()}
        <button
          className="submitBtn"
          type="submit"
        >
          login
        </button>
      </form>
    );
  }
}

export default graphql(userLogin)(LoginForm);
