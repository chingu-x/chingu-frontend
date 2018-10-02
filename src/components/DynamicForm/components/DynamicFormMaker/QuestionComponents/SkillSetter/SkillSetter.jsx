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
            console.log('potential duplicate')
            skills[this.findCurrentPositionOf(object)] = {};
        } 
        skills[position] = object;
        this.setState({ CHOSEN_SKILL_ELEMENTS: skills }, () => {
            this.props.onFormChange(this.idParser());
        })
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
        for (var i = 0; i < skills.length; i++) {
            if (!this.isNotEmpty(skills[i])) { continue; }
            if (object.id === skills[i].id) { return i; }
        }
    }

    isNotEmpty = (obj) => {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) { return true; }
            return false;
        }
    }

    idParser = () => {
        let skills = this.state.CHOSEN_SKILL_ELEMENTS;
        let nonNullSkills = skills.filter((skill) => { return this.isNotEmpty(skill) });
        let skillIds = nonNullSkills.map((skill) => { return skill.id });
        return { 
            currentTarget: {
                name: 'skill_ids',
                value: skillIds
            }
        };
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
                                    SKILL={CHOSEN_SKILL_ELEMENTS[num]}
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
