import * as React from "react";
import EditableSkills from './EditableSkills';
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
    }
];
*/

const DesiredSkillsPicker = ({ user, project, editable, DOM_ELEMENTS }) => {
    return DOM_ELEMENTS.map((elem, idx) => {
        return !editable
            ? <ChosenSkills key={idx} skills={user[elem.schemaKey] || project[elem.schemaKey]} elem={elem} />
            : <EditableSkills
                key={idx}
                skills={user[elem.schemaKey] || project[elem.schemaKey]}
                schemaKey={elem.schemaKey}
                elem={elem}
                hasPermission={editable}
            />
    });
}

export default DesiredSkillsPicker;