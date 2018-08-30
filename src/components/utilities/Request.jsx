import React from "react"
import PropTypes from "prop-types"
import { Query } from "react-apollo"
import Error from "../Error"
import Loader from "../Loader"

/**
 * USAGE
 * 
 * export default props => 
 *  <Request
 *  { ...props } - props passed to the component that will render
 *    PROPS MUST BE SPREAD FIRST
 *      allow component to overwrite any similarly named props passed from parent
 *  component={COMPONENT}
 *  query={QUERY}
 *  variables={VARIABLES}
 *  options={OPTIONS}
 *  globalLoader - determines if fullscreen loader will be shown while fetching data
 *  
 * />
 * 
 * Component receives props passed to it as well as data and the loading state, so that components which don't require the globalLoader can still handle the loading in some way
 */

const Request = ({
  ...props,
  component: Component,
  query,
  variables,
  options,
  globalLoader,
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