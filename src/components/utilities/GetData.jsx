import React from "react"
import { Query } from "react-apollo"
// import { gql } from "apollo-boost"
// import Loader from "../Loader/Loader"
import Error from "..//Error/Error"
import toggleLoader from "../utilities/toggleLoader"
import { gql } from "apollo-boost"

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
 */

// Not working  - saves any query to localStorage.lastChecked
// const shouldFetch = query => {
//   let lastChecked = localStorage.lastChecked
//   console.log({ query })
//   const current = Date.now()
//   const interval = 3000

//   localStorage.lastChecked = current
//   console.log("Should fetch", current - lastChecked)
//   return current >= lastChecked + interval
//     ? "network-only"
//     : "cache-only"
// }

export default ({ component: Component, query, variables, loader, ...props }) => (
  <Query query={query} variables={variables}>
    {
      ({ loading, error, data }) => {
        loader && toggleLoader(loading)

        if (loading && loader) return null
        if (error) return <Error error={error.message} /> // TODO: Pass goBack prop
        return <Component {...props} data={data} />

        // loader && toggleLoader(loading)
        // !loader && loading return <Loader />
        // if (error) return <Error error={error.message} /> // TODO: Pass goBack prop
        // return !loading ? <Component {...props} data={data} /> : null
      }
    }
  </Query>
)