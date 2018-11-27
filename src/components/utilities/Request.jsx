import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Error from "../Error";
import Loader from "../Loader";

const Request = props => {
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
      {payload => {
        const { loading, error } = payload;
        if (error) return <Error error={error.message} />; // TODO: Pass goBack prop
        if (loading && loader) return <Loader {...loader} />;
        return <Component variables={variables} {...otherProps} {...payload} />;
      }}
    </Query>
  );

  Request.propTypes = {
    component: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    variables: PropTypes.object,
    loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  };
};

Request.defaultProps = {
  loader: false
};

export default Request;
