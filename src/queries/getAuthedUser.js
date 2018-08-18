import { gql } from "apollo-boost";

const getUser = gql`
    query getUser {
      user {
        id
        avatar
        username
        status
        background
        interests
        coding_history
        country
        cohorts {
          id
          status
          status
          start_date
          end_date
          members {
            status
            user {
              username
            }
          }
        }
        teams {
          id
          title
          standups {
            progress_sentiment
            expiration
          }
          cohort {
            id
            title
            start_date
            end_date
            status
          }  
        }
      }
    }
  `;

  export default getUser