import { gql } from "apollo-boost"

const sidebarQuery = gql`
query sidebarQuery {
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
      }
    }
  }
}
`

export default sidebarQuery