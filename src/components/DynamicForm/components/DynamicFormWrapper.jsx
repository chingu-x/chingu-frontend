import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Error from "../../Error";
import DynamicFormContainer from "./DynamicFormContainer";

/**
 * @prop {object} client Apollo Client instance for mutating
 * @prop {string} purpose form purpose (database collection)
 * @prop {number} version form version
 * @prop {array} questions form questions
 * 
 * -- OPTIONAL -- 
 * @prop {object} hiddenData optional object of hidden input field value(s)
 * @prop {func} onValidate optional handler for validating a form field
 * @prop {func} onSubmit optional handler for submitting mutation
 * @prop {func} onResponse optional handler for response data
 * @prop {func} onError optional handler for error data
 */
class DynamicFormWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      error: null,
    }
  }

  handleResponse = ({ data: response }) => {
    // clear local storage persisted form data
    window.localStorage.removeItem(this.props.purpose);

    this.setState({ response });
  }

  handleError = ({ message }) => this.setState({ error: message });

  handleSubmit = (form_data) => {
    const {
      client,
      mutation,
      purpose,
      version,
    } = this.props;
  
    const variables = {
      purpose,
      version,
      form_data,
    };

    client.mutate({ mutation, variables })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  render() {
    const {
      onError,
      onSubmit,
      onResponse,
      purpose,
      questions,
      hiddenData,
    } = this.props;
    
    const { response, error } = this.state;

    if (error) return (
      onError
        ? onError(error)
        : <Error error={error} />
    );

    if (response) return (
      onResponse
        ? onResponse(response)
        : <Redirect to="/profile" />
    );

    return (
      <DynamicFormContainer
        purpose={purpose}
        questions={questions}
        hiddenData={hiddenData}
        onSubmit={onSubmit || this.handleSubmit}
      />
    );
  }
}

DynamicFormWrapper.propTypes = {
  client: PropTypes.object,
  purpose: PropTypes.string,
  version: PropTypes.number,
  hiddenData: PropTypes.object,
  onValidate: PropTypes.func,
  onSubmit: PropTypes.func,
  onResponse: PropTypes.func,
  onError: PropTypes.func,
};

DynamicFormWrapper.defaultProps = {
  hiddenData: null,
  onValidate: null,
  onSubmit: null,
  onResponse: null,
  onError: null,
};

export default DynamicFormWrapper;
