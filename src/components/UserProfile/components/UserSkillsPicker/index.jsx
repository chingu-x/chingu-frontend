import React from "react";
import ChosenSkills from "../ChosenSkills";
import UserEditableSkills from "./UserEditableSkills";

const UserSkillsPicker = ({ user, editable }) => (
  editable
    ? <UserEditableSkills user={user} />
    : <ChosenSkills skills={user.skills} description="Acquired Skills"/>
);

export default UserSkillsPicker;
