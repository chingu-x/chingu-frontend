import { gql } from "apollo-boost"

export const voyagesQuery = gql`
  query getVoyages {
    user {
      id
    }
    cohorts {
        id
        title
        start_date
        end_date
        status
        members {
          id
          status
          user {
            id
          }
        }
    }
  }
`

export default voyagesQuery