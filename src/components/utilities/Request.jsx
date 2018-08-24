import React from "react"
import PropTypes from "prop-types"
import { Query } from "react-apollo"
import Error from "../Error"
import toggleGlobalLoader from "./toggleGlobalLoader"

/**
 * USAGE
 * 
 * export default props => 
 *  <Request
 *  component={COMPONENT}
 *  query={QUERY}
 *  variables={VARIABLES}
 *  options={OPTIONS}
 *  globalLoader - determines if fullscreen loader will be shown while fetching data
 *  { ...props } - props passed to the component that will render
 * />
 * 
 * Component receives props passed to it as well as data and the loading state, so that components which don't require the globalLoader can still handle the loading in some way
 */

const Request = ({ component: Component, query, variables, options, globalLoader, ...props }) => (
  <Query query={query} variables={variables}>
    {
      ({ loading, error, data }) => {
        if (error) return <Error error={error.message} /> // TODO: Pass goBack prop
        globalLoader && toggleGlobalLoader(loading)
        if (loading && globalLoader) return null
        return <Component {...props} data={data} loading={loading} />
      }
    }
  </Query>
)

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