import { gql } from "apollo-boost"

const getProjectAndUser = gql`
  query getProject($id: ID) {
    project(id: $id) {
      id
      title
      description
      elevator_pitch
      project_url
      github_url
      images {
        id
        url
        order
      }
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