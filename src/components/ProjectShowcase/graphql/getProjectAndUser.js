import { gql } from "apollo-boost"

const getProjectAndUser = gql`
  query getProjectAndUser($title: String) {
    user {
      id
    }
    projects(title: $title) { # FIXME[1]: Update query for retrieving a single Project based on route params
      id
      title
      description
      project_url
      github_url
      users {
        id
        username
        avatar
      }
      skills{
        id
        name
      }
    }
  }
`

export default getProjectAndUser