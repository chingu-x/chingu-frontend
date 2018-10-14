import * as React from "react";
import SkillUpdater from './SkillUpdater';
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
        return (
            <React.Fragment>
                <SkillUpdater
                    headerText={elem.desc}
                    mutation={elem.mutation}
                    mutationName={elem.mutationName}
                    fieldName={elem.schemaKey}
                    updateSkills={this.updateSkills}
                />
                <ChosenSkills skills={this.state.updatedSkills || skills} elem={elem} />
            </React.Fragment>
        );
    }
}

export default EditableSkills;