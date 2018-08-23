import { gql } from "apollo-boost"

const teamQuery = gql`
query teamQuery {
  user {
    id
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
        id
          title
          level
      }
      project {
          id
          title
          description
          users {
            id
            username
            avatar
          }
          skills {
            id
              name
          }
      }
    }
  }
}
`

export default teamQuery