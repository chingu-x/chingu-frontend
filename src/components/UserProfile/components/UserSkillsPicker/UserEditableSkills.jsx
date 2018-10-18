import React from "react";
import { gql } from "apollo-boost";
import ChosenSkills from "../ChosenSkills";
import SkillsPicker from "../../../SkillsPicker";
import EditButton from '../../../common/EditButton'

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
    editing: false,
    displayEdit: false
  }

  toggleDisplayEdit = (displayEdit) => this.setState({ displayEdit });

  showPicker = () => {
    this.setState({ editing: true })
  }

  hidePicker = () => {
    this.setState({ editing: false })
  }

  render() {
    const { user } = this.props
    return (
      <div
        className="editable-text-field-container"
        onMouseOver={() => this.toggleDisplayEdit(true)}
        onMouseLeave={() => this.toggleDisplayEdit(false)}
      >
        {/* {displayEdit && <EditButton toggleEdit={this.toggleEdit} />} */}
        <EditButton onClick={this.showPicker} />
        <div className="user-skills" >
          <ChosenSkills
            description="Acquired Skills"
            skills={[...user.acquired_skills, ...user.requested_skills]}
          />
          {
            this.state.editing &&
            <SkillsPicker
              onSubmit={this.hidePicker}
              mutation={userAddSkills}
              currentSkills={user.acquired_skills}
            />}
        </div>
      </div>
    )
  }
}

export default UserEditableSkills;
