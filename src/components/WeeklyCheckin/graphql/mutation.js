import gql from "graphql-tag";

export const weeklyCheckinForm = gql`
mutation createStandup($standup_data:CohortTeamCohortUserStandupCreateInput){
  cohortTeamCohortUserStandupCreate(standup_data :$standup_data) {
    worked_on
  }
}
`