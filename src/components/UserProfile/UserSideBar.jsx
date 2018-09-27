import * as React from "react";
import './UserSideBar.css'
import EditableTextField from '../utilities/EditableTextField';
import { gql } from "apollo-boost";
import SkillUpdater from './SkillUpdater';

// -- MUTATION -- //
const userUpdate = gql`
mutation userUpdate($user_data: UserUpdateInput!) {
  userUpdate(user_data: $user_data) {
    id
    background
    interests
    coding_history
  }
}
`;

// -- USERINFO ELEMENTS -- //
const USER_INFO_DOM_ELEMENTS = [
  {
    divClassName: 'user-background',
    schemaKey: 'background',
    desc: 'Background',
  },
  {
    divClassName: 'user-coding-history',
    schemaKey: 'coding_history',
    desc: 'Coding History',
  },
  {
    divClassName: 'user-interests',
    schemaKey: 'interests',
    desc: 'Interests',
  },
];

const UserInfo = ({ user, editable }) => {
  return USER_INFO_DOM_ELEMENTS.map((elem, idx) => {
    const UserComponent = props =>
      <div key={idx} className={elem.divClassName}>
        <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
        {props.children}
      </div>

    return !editable // only render EditableTextField if editable
      ? <UserComponent key={idx}>{user[elem.schemaKey]}</UserComponent>
      : (
        <EditableTextField
          key={idx}
          large
          mutation={userUpdate}
          mutationName="userUpdate"
          mutationInputName="user_data"
          fieldName={elem.schemaKey}
          fieldData={user[elem.schemaKey]}
          hasPermission={editable}
          component={UserComponent}
        />
      )
  });
}

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
    schemaKey: 'skills',
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
        {props.children.map(elem => console.log(elem) (
          <li>{elem}</li>
        ))}
      </div>
    
    const QA = []

    return !editable // only render EditableTextField if editable
      ? <UserSkillComponent key={idx}>{user[elem.schemaKey]}</UserSkillComponent>
      : <SkillUpdater key={idx}/>
  });
}

const Links = ({ user: { username } }) => (
  <div className="user-links">
    <h1 className="user-sidebar-subcategory">links</h1>
    <ul>
      <li>
        <a target="_blank" href={`https://www.github.com/${username}`}>
          <i className="fab fa-github fa-3x" />
        </a>
      </li>
    </ul>
  </div>
);



// -- USER SIDEBAR (EXPORT)-- // 
const UserSideBar = ({ user, editable }) => (
  <div className="user-profile-container-personal">
    <header className="user">
      <div className="photobox">
        <img
          className="user-photo"
          src={user ? user.avatar : require('../../assets/blank image.png')}
          alt="userprofile" />
        <p>{user.username}</p>
        <p>Based in {user.country}</p>
      </div>
      <ul className="positions">
        <li className="position">
          <span><i className="fas fa-check" /></span>
          Programmer
        </li>
      </ul>
    </header>
    <UserInfo user={user} editable={editable} />
    <UserSkills user={user} editable={editable} />
    <Links user={user} />
  </div>
);

export default UserSideBar;

// once links are integrated again, render this
// check for fb/linkedin/gitub