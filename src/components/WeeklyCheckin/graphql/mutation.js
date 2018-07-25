import gql from "graphql-tag";

export const weeklyCheckinForm = gql`
mutation submitVoyageForm($voyage_form: JSON!, $new_voyage_user_form: JSON){
  submitVoyageForm(input:{voyage_form:$voyage_form, new_voyage_user_form:$new_voyage_user_form})
}
`