import gql from "graphql-tag";

const getSlackSecret = gql`
  query {
    getSlackSecret
  }
`;

export default getSlackSecret;
