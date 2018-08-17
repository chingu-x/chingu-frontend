import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom"

import Loading from "../Loader/Loader";
import Error from "../Error/Error";
import Landing from "./../Landing"

//-- USAGE --//
// export default props => <GetUser query={QUERY} load={BOOLEAN}><ChildComponent {...props}/></GetUser>

// optional boolean load parameter
// controls whether Loading component is rendered or not
export default ({ query, children, load }) => {
  if (!localStorage.token) {
    return load
      ? <Landing openLoginModal />
      : children
  }
  else {
    return <Query query={query}>
      {
        ({ loading, error, data }) => {
          console.log("GetUser status", { loading, error, user: data.user })
          if (loading) return load ? <Loading /> : null;
          if (error) return <Error error={error.message} />;

          // Render if data ready OR children doesn't require it
          if (data.user || !load) {
            const UserComponents = React.Children.map(children, (child) =>
              React.cloneElement(child, { ...child.props, loading, user: data.user })
            )
            return <div>{UserComponents}</div>
          }

          // TODO Will only return null if children require user data to render. Should return Loader??? 
          return null

        }
      }
    </Query>
  }
}