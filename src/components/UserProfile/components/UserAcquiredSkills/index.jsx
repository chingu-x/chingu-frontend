import React from "react";
import ChosenSkills from "../ChosenSkills";
import UserEditableSkills from "./UserEditableSkills";

const UserAcquiredSkills = ({ user, editable }) => (
  editable
    ? <UserEditableSkills user={user} />
    : (
      <ChosenSkills
        description="Acquired Skills"
        skills={[...user.acquired_skills, ...user.requested_skills]}
      />
    )
);

export default UserAcquiredSkills;
