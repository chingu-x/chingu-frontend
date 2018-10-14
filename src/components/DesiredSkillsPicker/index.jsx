import * as React from "react";
import EditableDesiredSkills from './EditableDesiredSkills';
import ChosenSkills from './ChosenSkills';
import './DesiredSkillPicker.css'
/**
 * @prop {string} user  user object. use either user or project as a prop!
 * @prop {string} project project object. use either user or project as a prop!
 * @prop {string} editable whether the user can edit
 * @prop {array} DOM_ELEMENTS array of objects in the below example
const DOM_ELEMENT = [
    {
        divClassName: 'user-skills',
        schemaKey: 'skills',
        desc: 'Skills',
        mutation: userAddSkills,
        mutationName: 'userAddSkills'
    }
];
*/
const DesiredSkillsPicker = ({ user, project, editable }) => (
  !editable
    ? <ChosenSkills
        skills={user.desired_skills}
        description="Desired Skills"
      />
    : <EditableDesiredSkills
        skills={user.desired_skills}
        hasPermission={editable}
    />
);

export default DesiredSkillsPicker;