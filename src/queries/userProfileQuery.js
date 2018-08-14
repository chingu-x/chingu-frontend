import { gql } from "apollo-boost"

// TODO Check query
const userProfileQuery = gql`
  {
    user @client {
      id
      username
      avatar
      country
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
            username
          }
        }
      }

    }
  }
`

export default userProfileQuery