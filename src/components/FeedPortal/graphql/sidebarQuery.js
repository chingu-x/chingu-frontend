import { gql } from "apollo-boost"

const sidebarQuery = gql`
query sidebarQuery {
  user {
    id
    username
    avatar
    active_projects {
      id
      ... on CohortProject {
        team_name
        cohort {
          id
          title
        }
      }
    }
  }
}
`

export default sidebarQuery