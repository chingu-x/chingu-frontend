import React from "react"
import PropTypes from "prop-types"
import { Query } from "react-apollo"
import Error from "../Error"
import Loader from "../Loader"

const Request = ({
  component: Component,
  query,
  options,
  loader,
  ...props,
  variables,
}) => (
    <Query query={query} variables={variables} {...options}>
      {
        ({ loading, error, data }) => {
          if (error) return <Error error={error.message} /> // TODO: Pass goBack prop
          if (loading && globalLoader) return <Loader />
          return <Component {...props} data={data} loading={loading} />
        }
      }
    </Query>
  );

Request.propTypes = {
  component: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  globalLoader: PropTypes.bool,
  variables: PropTypes.object,
}

Request.defaultProps = {
  globalLoader: false
}


export default Request