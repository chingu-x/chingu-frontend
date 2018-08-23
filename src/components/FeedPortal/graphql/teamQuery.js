import { gql } from "apollo-boost"

const teamQuery = gql`
query teamQuery {
  user {
    username
    avatar
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
          skills {
              name
          }
      }
    }
  }
}
`

export default teamQuery