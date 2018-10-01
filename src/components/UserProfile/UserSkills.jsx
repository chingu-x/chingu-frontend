import * as React from "react";
import { gql } from "apollo-boost";
import SkillUpdater from './SkillUpdater';

// -- MUTATION -- //
const userAddSkills = gql`
mutation userAddSkills($skill_ids: [ID!]) {
  userAddSkills(skill_ids: $skill_ids) {
    id
    skills {
      name
      category
    }
  }
}
`;

const userAddDesiredSkills = gql`
mutation userAddDesiredSkills($skill_ids: [ID!]) {
  userAddDesiredSkills(skill_ids: $skill_ids) {
    id
    skills {
      name
      category
    }
  }
}
`;


// -- SKILL ELEMENTS -- //
const USER_SKILLS_DOM_ELEMENTS = [
    {
        divClassName: 'user-skills',
        schemaKey: 'skill_ids',
        desc: 'Skills',
    },
    // {
    //   divClassName: 'user-desired-skills',
    //   schemaKey: 'desired_skills',
    //   desc: 'Desired Skills',
    // },
];

const UserSkills = ({ user, editable }) => {
    return USER_SKILLS_DOM_ELEMENTS.map((elem, idx) => {
        const UserSkillComponent = props =>
            <div key={idx} className={elem.divClassName}>
                <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
                {props.children.map(elem => console.log(elem)(
                    <li>{elem}</li>
                ))}
            </div>

        const QA = []

        return !editable // only render EditableTextField if editable
            ? <UserSkillComponent key={idx}>{user[elem.schemaKey]}</UserSkillComponent>
            : <SkillUpdater key={idx} />
    });
}

export default UserSkills;