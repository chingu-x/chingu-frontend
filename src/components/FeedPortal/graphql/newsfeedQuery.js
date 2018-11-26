import { gql } from "apollo-boost"

const getNewsfeed = gql`
  query projectNewsfeed($project_id: ID!) {
    user {
      id
      username
    }

    project(id: $project_id) {
      id
      available_standup { id }
      ... on CohortProject {
        team_name
        cohort {
          id
          title
        }
      }
    }
  }
`;

`
query projectNews($project_id: ID!) {
  project(project_id: $project_id) {
    id
    title
    available_standup {
      id
      expiration
    }
    standups(only_recent: true) {
      id
      member {
        id
        username
        avatar
      }
      updated_at
      progress_sentiment
      worked_on
      working_on
      blocked_on
    }
    news {
      title
      message
      timestamp
      ... on GithubNews {
        action
        entity
        url
      }
    }
  }
}
`

export default getNewsfeed;