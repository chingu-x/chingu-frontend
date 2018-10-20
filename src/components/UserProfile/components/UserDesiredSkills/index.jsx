import * as React from "react";
import ChosenSkills from "../ChosenSkills";
import DesiredSkillsPicker from './DesiredSkillsPicker';
import "./DesiredSkillPicker.css"
/**
 * @prop {string} user  user object
 * @prop {string} editable whether the viewing user can edit
*/

const UserDesiredSkills = ({ editable, user }) =>
  <div>
    {editable && <DesiredSkillsPicker />}
    <ChosenSkills
      description="Desired Skills"
      skills={user.desired_skills}
    />
  </div>


export default UserDesiredSkills;