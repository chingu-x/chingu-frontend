import gql from "graphql-tag";

const currentUserQuery = gql`
  query currentUserQuery {
    user {
      id,
      username,
      avatar
    }
  }
`;

export default currentUserQuery;