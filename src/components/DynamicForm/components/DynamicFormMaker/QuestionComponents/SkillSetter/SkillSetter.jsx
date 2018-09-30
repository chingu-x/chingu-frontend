import React from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RenderChosenSkills from './RenderChosenSkills';
import RenderSkills from './RenderSkills';

class SkillSetter extends React.Component {
    state = {
        SKILL_ELEMENTS: [],
        CHOSEN_SKILL_ELEMENTS: []
    }
    componentDidMount() {
        let { options } = this.props.data;
        let { backend, backend_dependency, database, frontend, frontend_dependency } = options[0];
        this.setState({
            SKILL_ELEMENTS: [
                frontend,
                frontend_dependency,
                backend,
                backend_dependency,
                database,
            ]
        })
    }

    // add or change position of an item
    addSkillHandler = (position, object) => {
        let skills = this.state.CHOSEN_SKILL_ELEMENTS;
        if (!this.checkForNoDuplicates(object)) {
            // if there is a duplicate, set existing
            // object position to empty object
            console.log('there are duplicates!');
            skills[this.findCurrentPositionOf(object)] = {};
        }
        skills[position] = object;
        console.log(skills);
        // this.setState({ CHOSEN_SKILL_ELEMENTS: skills })
        return null;
    }

    checkForNoDuplicates = (object) => {
        let skills = this.state.CHOSEN_SKILL_ELEMENTS;
        if (skills === []) { return true };
        return skills.every(skillObject => {
            if (skillObject === {}) { return true };
            return skillObject.id !== object.id;
        })
    }

    findCurrentPositionOf = (object) => {
        let skills = this.state.CHOSEN_SKILL_ELEMENTS;
        console.log(skills);
        for (var i = 0; i < skills.length; i++) {
            if (object === {}) { continue; }
            if (object.id === skills[i].id) { return i; }
        }
    }

    render() {
        let { SKILL_ELEMENTS, CHOSEN_SKILL_ELEMENTS } = this.state;
        const emptyContainers = [0, 1, 2, 3, 4];

        return (
            <div className="skill-setter">
                <div className="skill-options">
                    <RenderSkills
                        SKILL_ARRAY={SKILL_ELEMENTS}
                        addSkillHandler={this.addSkillHandler}
                        removeSkillHandler={this.removeSkillHandler}
                    />
                </div>
                <div className="skill-chosen">
                    <div className="skill-containers-empty">
                        {
                            emptyContainers.map((num) => {
                                return <RenderChosenSkills
                                    key={num}
                                    position={num}
                                    addSkillHandler={this.addSkillHandler}
                                    removeSkillHandler={this.removeSkillHandler}
                                    SKILL_ARRAY={CHOSEN_SKILL_ELEMENTS}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(SkillSetter);
