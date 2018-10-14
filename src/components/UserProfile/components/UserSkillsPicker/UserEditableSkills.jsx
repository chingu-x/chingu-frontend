import React from "react";
import ChosenSkills from "../ChosenSkills";
import SkillsPicker from "../../../SkillsPicker";

const UserEditableSkills = ({ user }) => (
  <div className="user-editable-skills" style={{ "margin": 50 }}>
    <ChosenSkills skills={user.skills} description="Acquired Skills" />
    <SkillsPicker currentSkills={user.skills} />
  </div>
);

export default UserEditableSkills;
