import { gql } from "apollo-boost"

const profileQuery = gql`
  query getUserProfile($username: String) {
    user(username: $username) {
      id
      username
      avatar
      country
      background
      interests
      coding_history
      timezone
      acquired_skills {
        id
        name
        category
        showcase_count
      }
      desired_skills {
        id
        name
        category
      }
      requested_skills {
        id
        name
      }
      active_cohort_project {
        id
        title
        description
        elevator_pitch
        skills {
          id
          name
        }
        members {
          id
          username
          avatar
        }
        cohort {
          id
          title
          start_date
          end_date
        }
        tier {
          level
          title
        }
        team_name
      }
      active_projects {
        id
        title
        description
        elevator_pitch
        skills {
          id
          name
        }
        members {
          id
          username
          avatar
        }
        ... on CohortProject {
          cohort {
            id
            title
            start_date
            end_date
          }
          tier {
            level
            title
          }
          team_name
        }
      }
      projects(filters: {status:inactive}) {
        id
        title
        description
        elevator_pitch
        skills {
          id
          name
        }
        members {
          id
          username
          avatar
        }
        ... on CohortProject {
          cohort {
            id
            title
            start_date
            end_date
          }
          tier {
            level
            title
          }
          team_name
        }
      }
      cohorts {
        id
        title
        start_date
        end_date
        members {
          id
          member_status
        }
      }
    }
  }
`

export default profileQuery