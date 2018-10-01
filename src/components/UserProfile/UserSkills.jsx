import * as React from "react";
import { gql } from "apollo-boost";
import SkillUpdater from './SkillUpdater';
import { userAddSkills, userAddDesiredSkills } from './graphql/skillMutations';


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

const EditableUserSkills = ({ skills, elem }) => {
    return (
    <div>
        <UserSkillComponent skills={skills} elem={elem} />
        <SkillUpdater 
            headerText={elem.divClassName === `user-desired-skills` ? 'Your Desired Skills' : 'Your Skills' } 
            mutation={elem.divClassName === `user-desired-skills` ? userAddDesiredSkills : userAddSkills }
        />
    </div> 
    );
}

const UserSkillComponent = ({ skills, elem }) => {
    return (
        <div className={elem.divClassName}>
            <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
            {skills.map(elem => (
                <li>{elem}</li>
            ))}
        </div>
    )
}
const UserSkills = ({ user, editable }) => {
    console.log(user);
    return USER_SKILLS_DOM_ELEMENTS.map((elem, idx) => {
        return !editable 
            ? <UserSkillComponent key={idx} skills={user[elem.schemaKey]} elem={elem} />
            : <EditableUserSkills 
                key={idx} 
                skills={user[elem.schemaKey]} 
                elem={elem}
            />
    });
}

export default UserSkills;