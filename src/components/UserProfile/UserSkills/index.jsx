import * as React from "react";
import EditableUserSkills from './EditableUserSkills';
import UserSkillComponent from './UserSkillComponent';

// -- SKILL ELEMENTS -- //
const USER_SKILLS_DOM_ELEMENTS = [
    {
        divClassName: 'user-skills',
        schemaKey: 'skills',
        desc: 'Skills',
    },
    {
        divClassName: 'user-desired-skills',
        schemaKey: 'desired_skills',
        desc: 'Desired Skills',
    },
];

const UserSkills = ({ user, editable }) => {
    return USER_SKILLS_DOM_ELEMENTS.map((elem, idx) => {
        return !editable
            ? <UserSkillComponent key={idx} skills={user[elem.schemaKey]} elem={elem} />
            : <EditableUserSkills
                key={idx}
                skills={user[elem.schemaKey]}
                schemaKey={elem.schemaKey}
                elem={elem}
                hasPermission={editable}
            />
    });
}

export default UserSkills;