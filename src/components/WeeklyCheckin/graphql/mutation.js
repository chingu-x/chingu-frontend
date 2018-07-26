import gql from "graphql-tag";

export const weeklyCheckinForm = gql`
mutation submitStandup(
  $standup_data:CohortTeamCohortUserStandupCreateInput!
  $cohort_id:ID!
) {
  cohortTeamCohortUserStandupSubmit(
    standup_data:$standup_data
    cohort_id:$cohort_id
  ) {
    expiration
  }
}
`