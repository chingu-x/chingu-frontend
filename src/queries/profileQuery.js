//need to add the projects query back in Projects.needs_help doesn't exist?
import gql from "graphql-tag";

const userQuery = gql`
  query userProfile($username: String!) {
    user(username: $username) {
      first_name
      last_name
      bio
      github_url
      twitter_url
      linkedin_url
      blog_url
      portfolio_url
      website_url
      profile_image
      skills {
        id
      }
      city {
        id
      }
      country {
        id
      }
      cohorts {
        title
        users{
          id
        }
        teams{
          id
        }
      }
    }
  }
`;

export default userQuery;