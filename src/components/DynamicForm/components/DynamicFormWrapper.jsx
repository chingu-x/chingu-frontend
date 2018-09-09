import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Error from "../../Error";
import DynamicFormContainer from "./DynamicFormContainer";
import dynamicFormSubmitMutation from "../dynamicFormSubmitMutation.js";

/**
 * @prop {object} client Apollo Client instance for mutating
 * @prop {string} purpose form purpose (database collection)
 * @prop {number} version form version
 * @prop {array} questions form questions
 * 
 * -- OPTIONAL -- 
 * @prop {bool} persistance controls LS persistence of form data 
 * @prop {object} hiddenData optional object of hidden input field value(s)
 * @prop {func} onValidate optional handler for validating a form field (onChange)
 * @prop {func} onSubmit optional handler for submitting form
 * @prop {func} onResponse optional handler for mutation response data
 * @prop {func} onError optional handler for mutation error message
 */
class DynamicFormWrapper extends React.Component {
  state = {
    response: null,
    error: null,
  }

  handleResponse = ({ data: response }) => {
    // clear local storage persisted form data
    window.localStorage.removeItem(this.props.purpose);

    this.setState({ response });
  }

  handleError = error => this.setState({ error });

  handleSubmit = (form_data) => {
    const {
      client,
      purpose,
      version,
    } = this.props;
  
    const variables = { purpose, version, form_data };

    client.mutate({
      mutation: dynamicFormSubmitMutation,
      variables,
    }).then(this.handleResponse)
    .catch(this.handleError);
  }

  render() {
    const {
      onValidate,
      onSubmit,
      onError,
      onResponse,
      persistance,
      purpose,
      questions,
      hiddenData,
    } = this.props;
    
    const { response, error } = this.state;

    if (error) return (
      onError
        ? onError(error)
        : <Error error={error.message} />
    );

    if (response) return (
      onResponse
        ? onResponse(response)
        : <Redirect to="/" />
    );

    return (
      <DynamicFormContainer
        persistance={persistance}
        purpose={purpose}
        questions={questions}
        hiddenData={hiddenData}
        onValidate={onValidate}
        onSubmit={onSubmit || this.handleSubmit}
      />
    );
  }
}

DynamicFormWrapper.propTypes = {
  client: PropTypes.object,
  purpose: PropTypes.string,
  version: PropTypes.number,
  questions: PropTypes.arrayOf(PropTypes.object),
  persistance: PropTypes.bool,
  hiddenData: PropTypes.object,
  onValidate: PropTypes.func,
  onSubmit: PropTypes.func,
  onResponse: PropTypes.func,
  onError: PropTypes.func,
};

DynamicFormWrapper.defaultProps = {
  persistance: true,
  hiddenData: null,
  onValidate: null,
  onSubmit: null,
  onResponse: null,
  onError: null,
};

export default DynamicFormWrapper;
