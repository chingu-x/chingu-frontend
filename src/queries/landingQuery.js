import { gql } from "apollo-boost"

const landingQuery = gql`
  {
    user @client {
      id
    }
  }
`
export default landingQuery