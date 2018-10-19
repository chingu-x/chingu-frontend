import React from "react";
import { gql } from "apollo-boost";
import ChosenSkills from "../ChosenSkills";
import SkillsPicker from "../../../SkillsPicker";
import EditButton from "../../../common/EditButton";
import { ActionButtons } from "../../../utilities/EditableTextField";

const userAddSkills = gql`
  mutation userAddSkills ($skill_ids:[ID!]!) {
    userAddSkills(skill_ids:$skill_ids) {
      id
      acquired_skills {
        id
        name
        category
        showcase_count
      }
      requested_skills {
        id
        name
      }
    }
  }
`;

class UserEditableSkills extends React.Component {
  state = {
    isEditing: false, // used to control rendering of SkillsPicker
    shouldSave: false, // used to control form submit in SkillsPicker
  }

  toggleEdit = () => this.setState(
    { isEditing: !this.state.isEditing }, // toggle editing mode
    () => this.state.shouldSave && this.toggleSave(), // reset shouldSave when closing
  );

  toggleSave = () => this.setState(
    { shouldSave: !this.state.shouldSave },
    () => this.state.isEditing && this.toggleEdit(), // close editing mode
  );

  render() {
    const { isEditing, shouldSave } = this.state;
    const { user } = this.props;
    return (
      <div className="user-editable-skills">
        <EditButton onClick={() => this.toggleEdit()} />
        <ChosenSkills
          description="Acquired Skills" 
          skills={[...user.acquired_skills, ...user.requested_skills]}
        />
        <SkillsPicker
          isEditing={isEditing}
          shouldSave={shouldSave}
          mutation={userAddSkills}
          currentSkills={user.acquired_skills}
        />
        {
          isEditing &&
          <ActionButtons onSave={this.toggleSave} onCancel={this.toggleEdit} />
        }
      </div>
    );
  }
}

export default UserEditableSkills;
