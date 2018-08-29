import { gql } from "apollo-boost"

const getProjectAndUser = gql`
  query getProject($id: ID!, $github_repo_id: String) {
    project(id: $id, github_repo_id: $github_repo_id) {
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

    }
  }
`

const getUserId = gql`
  query getUserId {
    user {
      id
    }
  }
`

export {getProjectAndUser, getUserId}