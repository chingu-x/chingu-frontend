import gql from "graphql-tag";

const currentUserQuery = gql`
  query currentUserQuery {
    user {
      id
    }
  }
`;

export default currentUserQuery;