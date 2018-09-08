import { gql } from "apollo-boost"

export default gql`
  query getUser {
    user {
      id
      status
      avatar
    }
  }
`