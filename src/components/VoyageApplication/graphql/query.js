const GET_USER_DATA = gql`{
    query GetUserData {
        user {
            cohorts {
                id
            }
        }
    }
}`;