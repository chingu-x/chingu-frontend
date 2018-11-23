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
      communication_url
      workflow_url
      users {
        id
        username
        avatar
      }
    }
  }
`

// images {
//   id
//   url
//   order
// }

const getUserId = gql`
  query getUserId {
    user {
      id
    }
  }
`

export {getProjectAndUser, getUserId}