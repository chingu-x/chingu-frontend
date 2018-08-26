import { gql } from "apollo-boost"

const getProjectQuery = gql`
query getProjectQuery($input: String!) {
    projects(title: $input) {
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
      skills {
        id
        name
      }
    }
  }
`

export default getProjectQuery