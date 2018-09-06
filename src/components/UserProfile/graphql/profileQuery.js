import { gql } from "apollo-boost"

const profileQuery = gql`
  query getUserProfile($username: String) {
    user(username: $username) {
      id
      username
      avatar
      country
      background
      interests
      coding_history
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
      teams {
        id
        title
        cohort {
          id
          title
          status
          start_date
          end_date
        }
        tier {
            title
            level
        }
        project {
            id
            title
            description
            users {
                username
                avatar
            }
        }
      }
    }
  }
`

export default profileQuery