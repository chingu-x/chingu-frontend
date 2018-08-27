import gql from "graphql-tag";

const authMutation = gql`
  mutation userGithubAuth($code: String!) {
    userAuthGithub(code: $code) 
  }
`;

export default authMutation;
