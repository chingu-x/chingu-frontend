import { gql } from "apollo-boost"

const headerQuery = gql`
  {
    user @client {
      id
      username
      avatar
      teams
    }
  }
`

export default headerQuery