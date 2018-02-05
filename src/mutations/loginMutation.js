import gql from "graphql-tag";

const loginMutation = gql`
  mutation userLogin(
    $email: String!, 
    $password: String!
  ) {
    signIn(email: $email, password: $password) {
      jwt
      user {
        id
        username
      }
    }
  }
`;

export default loginMutation;