import { gql } from "apollo-boost"

const getProjectAndUser = gql`
  query getProject($id: ID) {
    project(id: $id) {
      id
      title
      description
      elevator_pitch
      live_url
      members {
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