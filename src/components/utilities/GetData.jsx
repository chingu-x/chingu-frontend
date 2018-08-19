import React from "react"
import { Query } from "react-apollo"
import Loader from "../Loader/Loader"
import Error from "..//Error/Error"

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