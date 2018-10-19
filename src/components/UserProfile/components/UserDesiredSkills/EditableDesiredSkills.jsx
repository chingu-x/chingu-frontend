import * as React from "react";
import DesiredSkillsPicker from './DesiredSkillsPicker';
import ChosenSkills from "../ChosenSkills";

class EditableSkills extends React.Component {
  state = {
    updatedSkills: null
  }
// TODO: not needed
  updateSkills = (data) => {
    const { userAddDesiredSkills: { desired_skills } } = data;
    return this.setState({ updatedSkills: desired_skills });
  }

  render() {
    const { skills } = this.props;
    return (
      <div>
        <DesiredSkillsPicker updateSkills={this.updateSkills} />
        <ChosenSkills
          description="Desired Skills"
          skills={this.state.updatedSkills || skills}
        />
      </div>
    );
  }
}

export default EditableSkills;