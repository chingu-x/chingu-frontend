import { gql } from "apollo-boost"

const getNewsfeed = gql`
  query getNewsfeed($input: NewsfeedInput!) {
    newsfeed(input: $input) {
      id

      team {
        id
        title
        cohort {
          id
          title
          status
          start_date
          end_date
        }
        tier {
            title
            level
        }
        project {
            id
            title
            description
            users {
                username
                avatar
            }
        }
      }

      chingu {
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
      }
      
      other {
        id
        type: __typename
        timestamp
        user {
          id
          username
          avatar
        }
        ... on NewsfeedStandup {
          standup {
            id
            is_expired
            progress_sentiment
            worked_on
            working_on
            blocked_on
            expiration
            cohort_team {
              id
              title
            }
          }
        }
        
        ... on GithubActivityItem {
            title
            url
            repo {
              id
              repo_name
            }
          
            ... on GithubActivityIssue {
              status
              created_at
              updated_at
            }

            ... on GithubActivityPullRequest {
              status
              files_changed
            }
        }
      }
    }
  }
`

export default getNewsfeed;