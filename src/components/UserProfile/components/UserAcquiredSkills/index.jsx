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
    // shouldSave: false, // used to control form submit in SkillsPicker
  }

  toggleEdit = () => this.setState(
    this.setState({ isEditing: !this.state.isEditing })
  );

  /**
   * Flow: TODO: Fixme
   * 
   * 1) Edit, ChosenSkills, SkillsPicker are mounted, state - initial
   *     - Edit, ChosenSkills are rendered
   *     - SkillsPicker -> componentDidMount -> sets isEditing: false -> renders null
   * 2) Edit button clicked -> toggleEdit() -> isEditing: toggled true, shouldSave: no change, false
   *     - SkillsPicker receives new props -> isEditing: true, shouldSave: false -> renders SkillsPicker
   *     - ActionButtons rendered
   * 3, cancel) User hits Cancel ActionButton -> toggleEdit() called
   *     - isEditing: true -> toggled to false -> shouldSave: false, no change
   *     - SkillsPicker -> new props -> isEditing: false, shouldSave: false -> renders null, still mounted
   * 3, save) User hits Update ActionButton -> toggleSave() called
   *     - shouldSave toggled true
   *     - isEditing true -> this.toggleEdit() called
   *     - SkillsPicker new props -> shouldSave true -> calls SkillsPicker.handleSubmit()
   *     - UEditableSkills state updates -> isEditing: false, shouldSave: false,
   *     - isEditing: false -> SkillsPicker unmounts
   */
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