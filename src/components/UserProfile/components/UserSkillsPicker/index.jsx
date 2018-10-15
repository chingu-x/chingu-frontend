import React from "react";
import ChosenSkills from "../ChosenSkills";
import UserEditableSkills from "./UserEditableSkills";

const UserSkillsPicker = ({ user, editable }) => (
  editable
    ? <UserEditableSkills user={user} />
    : <ChosenSkills
        description="Acquired Skills"
        skills={[...user.skills, ...user.requested_skills]}
      />
);

export default UserSkillsPicker;
