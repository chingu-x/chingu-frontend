import * as React from "react";
import SkillUpdater from './SkillUpdater';
import { userAddSkills, userAddDesiredSkills } from '../graphql/skillMutations';
import UserSkillComponent from './UserSkillComponent';

class EditableUserSkills extends React.Component {
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
                {
                    <SkillUpdater
                        headerText={isDesiredSkill ? 'Your Desired Skills' : 'Your Skills'}
                        mutation={isDesiredSkill ? userAddDesiredSkills : userAddSkills}
                        mutationName={isDesiredSkill ? 'userAddDesiredSkills' : 'userAddSkills'}
                        fieldName={elem.schemaKey}
                        updateSkills={this.updateSkills}
                    />
                }
                <UserSkillComponent skills={this.state.updatedSkills || skills} elem={elem} />
            </React.Fragment>
        );
    }
}

export default EditableUserSkills;