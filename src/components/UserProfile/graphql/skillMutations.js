import { gql } from "apollo-boost"

export const userAddSkills = gql`
mutation userAddSkills($skill_ids: [ID!]) {
  userAddSkills(skill_ids: $skill_ids) {
    id
    skills {
      name
      category
    }
  }
}
`;


export const userAddDesiredSkills = gql`
mutation userAddDesiredSkills($skill_ids: [ID!]) {
  userAddDesiredSkills(skill_ids: $skill_ids) {
    id
    skills {
      name
      category
    }
  }
}
`;