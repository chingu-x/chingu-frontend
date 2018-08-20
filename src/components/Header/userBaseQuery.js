import { gql } from "apollo-boost"

export default gql`
  query getUser {
    user {
      id
      status
      teams {
        id
        title
      }
      avatar
    }
  }
`