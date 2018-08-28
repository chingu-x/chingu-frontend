import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import qs from "query-string";

import './DynamicForm.css';
import Loader from '../Loader';
import Error from '../Error';
import { client } from "../../";
import {
  DynamicFormWrapper,
  DynamicFormContainer,
  dynamicFormMaker,
  questionComponents,
} from "./components";

import dynamicFormQuery from "./dynamicFormQuery";
import dynamicFormSubmitMutation from "./dynamicFormSubmitMutation";

/**
 * @prop {string} purpose Dynamic Form purpose
 * --- OPTIONAL ---
 * @prop {number} version Dynamic Form version for given purpose
 * @prop {object} hiddenData object of values for hidden inputs
 * @prop {string} queryString query string data for hidden inputs
 * @prop {object} mutation alternative mutation (default submitDynamicForm)
 * @prop {func} onSubmit custom handler for submit
 * @prop {func} onResponse custom handler for mutation response data
 * @prop {func} onError custom handler for mutation error
 */
const DynamicForm = (
  {
    purpose,
    version,
    hiddenData,
    queryString,
    mutation,
    onSubmit,
    onResponse,
    onError,
  },
) => (
  <Query query={dynamicFormQuery} variables={{ purpose, version }}>
    {
      ({ data, loading, error }) => {
        if (loading) return <Loader />;
        if (error) return <Error error={error.message} />;
        if (data.dynamicFormData) {
          const { dynamicFormData } = data;
          return (
            <DynamicFormWrapper
              client={client}
              mutation={mutation}
              hiddenData={
                queryString || hiddenData ?
                  Object.assign(hiddenData, qs.parse(queryString)) :
                  null
              }
              onSubmit={onSubmit}
              onResponse={onResponse}
              onError={onError}
              {...dynamicFormData}
            />
          );
        }
        return (
          <Error
            error={`No Dynamic Form found: purpose: ${purpose}, version: ${version}`}
          />
        )
      }
    }
  </Query>
);

DynamicForm.propTypes = {
  purpose: PropTypes.string,
  version: PropTypes.number,
  hiddenData: PropTypes.object,
  queryString: PropTypes.string,
}

DynamicForm.defaultProps = {
  mutation: dynamicFormSubmitMutation,
  onSubmit: null,
  onResponse: null,
  onError: null,
}

export {
  DynamicForm,
  DynamicFormWrapper,
  DynamicFormContainer,
  dynamicFormMaker,
  questionComponents,
};
