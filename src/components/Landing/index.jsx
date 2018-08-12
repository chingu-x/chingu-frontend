import * as React from "react";
import { gql } from "apollo-boost";

import GetUser from "../utilities/GetUser";
import Landing from "./Landing";

const LandingUserQuery = gql`
  query LandingUserQuery {
    user {
      id
    }
  }
`;

export default () => (
  window.localStorage.getItem('token') ?
    <GetUser
      query={LandingUserQuery}
      component={Landing}
    /> :
    <Landing />
);
