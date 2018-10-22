import React from "react";
import { gql } from "apollo-boost";
import ChosenSkills from "../ChosenSkills";
import SkillsPicker from "../../../SkillsPicker";
import EditButton from "../../../common/EditButton";

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

class UserAcquiredSkills extends React.Component {
  state = {
    isEditing: false, // used to control rendering of SkillsPicker
  }

  toggleEdit = () => this.setState(
    this.setState({ isEditing: !this.state.isEditing })
  );

  render() {
    const { editable, user } = this.props;
    return (
      <div className="user-editable-skills">
        {editable && <EditButton onClick={() => this.toggleEdit()} />}
        <ChosenSkills
          description="Acquired Skills"
          skills={[...user.acquired_skills, ...user.requested_skills]}
        />
        {
          this.state.isEditing && (
            <React.Fragment>
              <br />
              <SkillsPicker
                mutation={userAddSkills}
                currentSkills={user.acquired_skills}
                onSave={this.toggleEdit}
                onCancel={this.toggleEdit}
              />
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

export default UserAcquiredSkills;