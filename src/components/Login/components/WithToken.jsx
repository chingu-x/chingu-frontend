import * as React from "react";
import { Redirect } from "react-router-dom";
import { Query } from "react-apollo"

import Loading from "../../Loader/Loader";
import Error from "../../Error/Error";

import getAuthedUser from "../../../queries/getAuthedUser"

// TODO Remove? Queried on app load
const WithToken = () => (
  <Query query={getAuthedUser}>
    {
      ({ data, loading, error, client }) => {
        console.log("Logging in with token")
        if (loading) return <Loading />;
        if (error) return <Error error={error.message} />;

        const { user } = data;
        client.writeData({ data: { user: { __typename: "User", ...data.user } } })
        window.localStorage.setItem('store', JSON.stringify({ version: 5, user }));

        return <Redirect to="/profile" />;
      }
    }
  </Query>
);

export default WithToken;
