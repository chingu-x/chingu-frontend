import React from "react";
import { gql } from "apollo-boost";
import ChosenSkills from "../ChosenSkills";
import SkillsPicker from "../../../SkillsPicker";

const userAddSkills = gql`
  mutation userAddSkills ($skill_ids:[ID!]!) {
    userAddSkills(skill_ids:$skill_ids) {
      id
      acquired_skills {
        id
        name
        category
        showcase_count
      }
      requested_skills {
        id
        name
      }
    }
  }
`;
// TODO: create 'user-editable-skills' class, remove style
const UserEditableSkills = ({ user }) => (
  <div className="user-editable-skills" style={{ "margin": 50 }}>
    <ChosenSkills
      description="Acquired Skills" 
      skills={[...user.acquired_skills, ...user.requested_skills]}
    />
    <SkillsPicker
      mutation={userAddSkills}
      currentSkills={user.acquired_skills}
    />
  </div>
);

export default UserEditableSkills;
