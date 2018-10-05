import * as React from "react";
import SkillUpdater from './SkillUpdater';
import { userAddSkills, userAddDesiredSkills } from './skillMutations';
import ChosenSkills from './ChosenSkills';

class EditableSkills extends React.Component {
    state = {
        updatedSkills: null
    }

    updateSkills = (data) => {
        this.setState({ updatedSkills: data })
    }

    render() {
        let { elem, skills } = this.props;
        let isDesiredSkill = elem.divClassName === `user-desired-skills`;
        return (
            <React.Fragment>
                <SkillUpdater
                        headerText={isDesiredSkill ? 'Your Desired Skills' : 'Your Skills'}
                        mutation={isDesiredSkill ? userAddDesiredSkills : userAddSkills}
                        mutationName={isDesiredSkill ? 'userAddDesiredSkills' : 'userAddSkills'}
                        fieldName={elem.schemaKey}
                        updateSkills={this.updateSkills}
                />
                <ChosenSkills skills={this.state.updatedSkills || skills} elem={elem} />
            </React.Fragment>
        );
    }
}

export default EditableSkills;