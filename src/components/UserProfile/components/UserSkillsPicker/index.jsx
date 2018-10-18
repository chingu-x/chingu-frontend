import React from "react";
import PropTypes from 'prop-types'
import ChosenSkills from "../ChosenSkills";
import UserEditableSkills from "./UserEditableSkills";

const UserSkillsPicker = ({ user, editable }) => (
  console.log({user})
    ? <UserEditableSkills user={user} />
    : <ChosenSkills
        description="Acquired Skills"
        skills={[...user.acquired_skills, ...user.requested_skills]}  
      />
);

UserSkillsPicker.defaultProps = {
  skills: [],
  requested_skills: []
}

export default UserSkillsPicker;
