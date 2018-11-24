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
      timezone
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
      projects {
        id
        title
        description
        elevator_pitch
        members {
          id
          username
          avatar
        }
      }
      cohorts {
        id
        title
        start_date
        end_date
        members {
          id
          member_status
        }
      }
    }
  }
`

export default profileQuery