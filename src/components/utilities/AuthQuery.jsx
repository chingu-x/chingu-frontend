import * as React from "react";
import { Query } from "react-apollo";

import Loading from "../Loader/Loader";
import Error from "../Error/Error";

// optional boolean load parameter
// controls whether Loading component is rendered or not
export default ({ query, children, load }) => {
  if (!localStorage.token) return children
  else {
    return <Query query={query}>
      {
        client => {
          const { loading, error } = client
          if (error) return <Error error={error.message} />;
          if (loading) return load ? <Loading /> : null;

          const UserComponents = React.Children.map(children, (child) => {
            return React.cloneElement(child, { client })
          })

          return <div>{UserComponents}</div>
        }
      }
    </Query>
  }
}