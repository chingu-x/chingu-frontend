import * as React from "react";
import DesiredSkillsPicker from './DesiredSkillsPicker';
import ChosenSkills from "../ChosenSkills";

const EditableSkills = ({ skills }) =>
  <div>
    <DesiredSkillsPicker />
    <ChosenSkills
      description="Desired Skills"
      skills={skills}
    />
  </div>


export default EditableSkills;