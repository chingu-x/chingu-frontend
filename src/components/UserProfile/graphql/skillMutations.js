import { gql } from "apollo-boost"

export const userAddSkills = gql`
mutation userAddSkills ($skill_ids:[ID!]!) {
  userAddSkills(skill_ids:$skill_ids) {
    id
    skills {
      id
      name
    }
  }
}
`;


export const userAddDesiredSkills = gql`
mutation addDesiredSkills ($skill_ids:[ID!]!) {
  userAddDesiredSkills(skill_ids:$skill_ids) {
    id
    desired_skills {
      id
      name
    }
  }
}
`;