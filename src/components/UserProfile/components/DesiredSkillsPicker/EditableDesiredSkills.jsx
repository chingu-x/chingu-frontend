import * as React from "react";
import DesiredSkillsPicker from './DesiredSkillsPicker';
import ChosenSkills from "../ChosenSkills";

const EditableSkills = ({ skills }) =>
  <React.Fragment>
    <DesiredSkillsPicker skills={skills} />
    <ChosenSkills
      description="Desired Skills"
      skills={skills}
    />
  </React.Fragment>

export default EditableSkills;