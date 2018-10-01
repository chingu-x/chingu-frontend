import * as React from "react";
import SkillUpdater from './SkillUpdater';
import { userAddSkills, userAddDesiredSkills } from '../graphql/skillMutations';
import UserSkillComponent from './UserSkillComponent';

class EditableUserSkills extends React.Component {
    state = {
        displayEdit: false
    }

    toggleDisplayEdit = (displayEdit) => {
        this.setState({ displayEdit });
    }

    render() {
        let { hasPermission, elem, skills } = this.props;
        // let { displayEdit, displaySkillWindow } = this.state;
        return (
            <div
                // onMouseEnter={() => hasPermission && this.toggleDisplayEdit(true)}
                // onMouseLeave={() => hasPermission && this.toggleDisplayEdit(false)}
            >
                {
                    <SkillUpdater
                        headerText={elem.divClassName === `user-desired-skills` ? 'Your Desired Skills' : 'Your Skills'}
                        mutation={elem.divClassName === `user-desired-skills` ? userAddDesiredSkills : userAddSkills}
                    />
                }
                <UserSkillComponent skills={skills} elem={elem} />
            </div>
        );
    }
}

export default EditableUserSkills;