import * as React from "react";
import { Query } from "react-apollo";

import Loading from "../Loader/Loader";
import Error from "../Error/Error";

export default ({ query, component, load }) => (
  <Query query={query}>
  {
    ({ data, loading, error }) => {
      if (loading) return load ? <Loading /> : null;
      if (error) return <Error error={error.message} />;
      return component(data.user);
    }
  }
  </Query>
);
