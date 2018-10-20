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
      acquired_skills {
        id
        name
        category
        showcase_count
      }
      desired_skills {
        id
        name
        category
      }
      requested_skills {
        id
        name
      }
      cohorts {
        id
        title
        start_date
        end_date
        members {
          id
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
            elevator_pitch
            images {
              id
              url
            }
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