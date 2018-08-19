import React from "react"
import { Query } from "react-apollo"
import Loader from "../Loader/Loader"
import Error from "..//Error/Error"

/**
 * USAGE
 * export default props => 
 *  <GetData
 *  component={COMPONENT}
 *  query={QUERY}
 *  variables={VARIABLES}
 *  { ...props } - props passed to the component that will render
 *  load - determines if fullscreen loader will be shown while fetching data
 * />
 * 
 * Component receives props passed to it as well as all query results (client, loading, error, data)
 * 
 * TODO: Consider controlling auth requirement through requireAuth or similar prop. At the moment handled in Component view. 
 */

export default ({ component: Component, query, variables, load, ...props }) => (
  <Query query={query} variables={variables}>
    {
      queryResult => {
        const { loading, error, data } = queryResult
        if (loading) return load ? <Loader background="opaque" /> : null // TODO: pass background prop
        if (error) return <Error error={error.message} /> // TODO: Pass goBack prop

        return <Component {...props} {...queryResult} />
      }
    }
  </Query>
)