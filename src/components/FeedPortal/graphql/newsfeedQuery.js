import { gql } from "apollo-boost"

const getNewsfeed = gql`
query getNewsfeed($input: NewsfeedInput!) {
    newsfeed(input: $input) {
      id
      items {
        id
        type: __typename
        timestamp
        user {
          id
          username
          avatar
        } 
        
        ... on NewsfeedVoyage {
          voyage{
            id
            title
          }
        }
        
        ... on NewsfeedStandup {
          standup {
            id
            is_expired
            progress_sentiment
            expiration
            cohort_team {
              id
              title
            }
          }
        }
        
        ... on GithubActivityItem {
              repo {
              id
              repo_name
            }
          
            ... on GithubActivityIssue {
              id
              url
              title
              created_at
              updated_at
            }
  
          ... on GithubActivityPullRequest {
            id
            url
            title
            status
            files_changed
          }
        }  
      }
    }
  }
`

export default getNewsfeed;