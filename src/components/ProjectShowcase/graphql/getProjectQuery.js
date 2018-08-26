import { gql } from "apollo-boost"

const getProjectQuery = gql`
query getProject($input: String!) {
  getProject(title: $input) @client {
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