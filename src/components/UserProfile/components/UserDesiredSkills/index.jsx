import * as React from "react";
import EditableDesiredSkills from "./EditableDesiredSkills";
import ChosenSkills from "../ChosenSkills";
import "./DesiredSkillPicker.css"
/**
 * @prop {string} user  user object
 * @prop {string} editable whether the viewing user can edit
*/
const UserDesiredSkills = ({ user, editable }) => (
  editable
    ? <EditableDesiredSkills skills={user.desired_skills} />
    : (
      <ChosenSkills
        skills={user.desired_skills}
        description="Desired Skills"
      />
    )
);

export default UserDesiredSkills;
