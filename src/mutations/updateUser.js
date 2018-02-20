import gql from "graphql-tag";

const updateUser = gql`
  mutation updateUser(
    $first_name: String
    $last_name: String
    $username: String
    $github_url: String
    $bio: String
    $linkedin_url: String
    $portfolio_url: String
    $website_url: String
    $twitter_url: String
    $blog_url: String
  ) {
    updateUser(
      user_data: {
        first_name: $first_name
        last_name: $last_name
        username: $username
        github_url: $github_url
        bio: $bio
        linkedin_url: $linkedin_url
        portfolio_url: $portfolio_url
        website_url: $website_url
        twitter_url: $twitter_url
        blog_url: $blog_url
      }
  ) {
      username
      
    }
  }
`;

export default updateUser;