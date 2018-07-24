import gql from "graphql-tag";

export const submitApplication = gql`
mutation submitVoyageForm($voyage_form: JSON!, $user_form: JSON){
  submitVoyageForm(input:{voyage_form:$voyage_form, user_form:$user_form})
}
`