import { gql } from "apollo-boost"

const sidebarQuery = gql`
query sidebarQuery {
  user {
    username
    avatar
    teams {
      id
      title
      cohort {
        title
      }
    }
  }
}
`

export default sidebarQuery