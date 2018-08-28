import { gql } from "apollo-boost"

const profileQuery = gql`
  query profileQuery {
    user {
      id
      username
      avatar
      country
      background
      interests
      coding_history
      teams {
        id
        title
        cohort {
          id
          status
          start_date
          end_date
        }
      }
      cohorts {
        id
        title
        start_date
        end_date
        members {
          id
          status
          user {
            id
            username
          }
        }
      }

    }
  }
`

export default profileQuery