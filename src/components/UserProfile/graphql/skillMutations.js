import { gql } from "apollo-boost"

export const userAddSkills = gql`
mutation userAddSkills ($skill_ids:[ID!]!) {
  userAddSkills(skill_ids:$skill_ids) {
    id
    skills {
      id
      name
      category
    }
  }
}
`;
