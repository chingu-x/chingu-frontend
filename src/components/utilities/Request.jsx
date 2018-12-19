import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Error from '../Error';
import Loader from '../Loader';

/**
 * makes a query and injects the response data as props into
 * the component prop
 * @param {*} props
 * @param {func} props.query Query to execute
 * @param {func} props.variables Query variables
 * @param {func} props.loader controls Loader rendering
 * @param {func} props.component Component to inject response data
 * @param {func} props.options Apollo Client Query options
 * @param {*} other Spread any other props to be carried over into the Component through {...props}
 */
const Request = (props) => {
  const {
    component: Component,
    query,
    options,
    loader,
    variables,
    ...otherProps
  } = props;

  return (
    <Query query={query} variables={variables} {...options}>
      {(payload) => {
        const { loading, error } = payload;
        if (error) return <Error error={error.message} />; // TODO: Pass goBack prop
        if (loading && loader) return <Loader {...loader} />;
        return <Component variables={variables} {...otherProps} {...payload} />;
      }}
    </Query>
  );
};

Request.propTypes = {
  component: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  variables: PropTypes.object,
  loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Request.defaultProps = {
  loader: false,
};

export default Request;
