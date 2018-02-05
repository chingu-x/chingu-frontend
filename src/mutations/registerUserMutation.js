import gql from "graphql-tag";

const registerUser = gql`
  mutation registerUser(
    $first_name: String!
    $last_name: String!
    $email: String!
    $github_url: String!
    $password: String!
    $username: String!
  ) {
    createUser(
      user_data: {
        first_name: $first_name
        last_name: $last_name
        github_url: $github_url
        username: $username
      }
      email: $email
      password: $password
    ) {
      jwt
      user {
        id
      }
    }
  }
`;

export default registerUser;
