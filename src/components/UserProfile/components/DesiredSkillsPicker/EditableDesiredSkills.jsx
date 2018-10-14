import * as React from "react";
import DesiredSkillsPicker from './DesiredSkillsPicker';
import ChosenSkills from "../ChosenSkills";

class EditableSkills extends React.Component {
  state = {
    updatedSkills: null
  }

  updateSkills = (data) => {
    const { userAddDesiredSkills: { desired_skills } } = data;
    return this.setState({ updatedSkills: desired_skills });
  }

  render() {
    const { skills } = this.props;
    return (
      <React.Fragment>
        <DesiredSkillsPicker updateSkills={this.updateSkills} />
        <ChosenSkills
          description="Desired Skills"
          skills={this.state.updatedSkills || skills}
        />
      </React.Fragment>
    );
  }
}

export default EditableSkills;