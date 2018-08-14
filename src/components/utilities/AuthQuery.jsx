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
        ({ data, loading, error }) => {
          if (loading) return load ? <Loading /> : null;
          if (error) return <Error error={error.message} />;

          const UserComponents = React.Children.map(children, (child) => {
            return React.cloneElement(child, { user: data.user, loading }) // Also pass loading state for possible small loading indicators
          })

          return <div>{UserComponents}</div>
        }
      }
    </Query>
  }
}