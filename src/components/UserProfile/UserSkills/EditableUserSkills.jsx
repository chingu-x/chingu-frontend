import * as React from "react";
import SkillUpdater from './SkillUpdater';
import { userAddSkills, userAddDesiredSkills } from '../graphql/skillMutations';
import UserSkillComponent from './UserSkillComponent';

class EditableUserSkills extends React.Component {
    state = {
        displayEdit: false,
        updatedSkills: null
    }

    // toggleDisplayEdit = (displayEdit) => {
    //     this.setState({ displayEdit });
    // }

    updateSkills = (data) => {
        this.setState({ updatedSkills: data }, () => { this.forceUpdate() })
    }

    render() {
        let { hasPermission, elem, skills } = this.props;
        let isDesiredSkill = elem.divClassName === `user-desired-skills`;
        console.log(skills);
        // let { displayEdit, displaySkillWindow } = this.state;
        return (
            <div
                // onMouseEnter={() => hasPermission && this.toggleDisplayEdit(true)}
                // onMouseLeave={() => hasPermission && this.toggleDisplayEdit(false)}
            >
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
            </div>
        );
    }
}

export default EditableUserSkills;