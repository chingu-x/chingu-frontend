import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom"

import Loading from "../Loader/Loader";
import Error from "../Error/Error";

// optional boolean load parameter
// controls whether Loading component is rendered or not
export default ({ query, children, load }) => {
  if (!localStorage.token) {
    return load ? <Redirect to="/login" /> : children
  }
  else {
    return <Query query={query}>
      {
        client => {
          const { loading, error, data } = client
          console.log("GetUser status", { loading, error, user: data.user })
          if (loading) return load ? <Loading /> : null;
          if (error) return <Error error={error.message} />;

          // Render if data ready OR children doesn't require it
          if (data.user || !load) {
            // TODO keep prev props !!!! Maybe turn into HOC?
            const UserComponents = React.Children.map(children, (child) => {
              return React.cloneElement(child, { loading, user: data.user })
            })
            return <div>{UserComponents}</div>
          }

          return null

        }
      }
    </Query>
  }
}