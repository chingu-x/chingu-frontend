import gql from "graphql-tag";

const loginMutation = gql`
  mutation userGithubAuth($code: String!) {
    userGithubAuth(code: $code) {
      jwt
    }
  }
`;

export default loginMutation;
