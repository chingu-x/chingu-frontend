import React from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RenderChosenSkills from './RenderChosenSkills';
import RenderSkills from './RenderSkills';

class SkillSetter extends React.Component {
    state = {
        SKILL_ELEMENTS: [],
        CHOSEN_SKILL_ELEMENTS: [],
        OPTION_LENGTH: 0
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
            ],
            CHOSEN_SKILL_ELEMENTS: this.props.form_data.skill_ids,
            OPTION_LENGTH:  this.props.form_data.skill_ids.length
        })
    }

    // add or change position of an item
    addSkillHandler = (position, object) => {
        let chosenSkills = this.state.CHOSEN_SKILL_ELEMENTS;
        if (chosenSkills.indexOf(object) === -1) {
            // if this is the first time the skill object has been added to chosen skills
            this.setState({ SKILL_ELEMENTS: this.updateSkillOptions(object) })
        }
        if (!this.checkForNoDuplicates(object, chosenSkills)) {
            // if there is a duplicate, set existing position to null
            chosenSkills[this.findCurrentPositionOf(object, chosenSkills)] = null;
        }
        if (chosenSkills[position] !== null) {
            // if there is an object in that position
            // add that existing object back into skill options
            this.updateSkillOptions(chosenSkills[position])
        }
        // set skill in correct position
        chosenSkills[position] = object;

        this.setState({
            CHOSEN_SKILL_ELEMENTS: chosenSkills,
        }, () => {
            this.props.onFormChange(this.idParser());
        })
    }

    removeSkillHandler = (object) => {
        let skill_array = this.state.CHOSEN_SKILL_ELEMENTS;
        let position = this.findCurrentPositionOf(object, skill_array);
        skill_array[position] = null;
        this.setState({ 
            CHOSEN_SKILL_ELEMENTS: skill_array,
            SKILL_ELEMENTS: this.updateSkillOptions(object) 
         });
    }

    checkForNoDuplicates = (object, skill_array) => {
        return skill_array.every(skillObject => {
            if (skillObject === null) { return true };
            return skillObject.id !== object.id;
        })
    }

    findCurrentPositionOf = (object, skill_array) => {
        for (var i = 0; i < skill_array.length; i++) {
            if (skill_array[i] === null) { continue; }
            if (object.id === skill_array[i].id) { return i; }
        }
    }

    updateSkillOptions = (object) => {
        let skillOptions = this.state.SKILL_ELEMENTS;
        let arrayCategories = ['frontend', 'frontend_dependency', 'backend', 'backend_dependency', 'database'];
        let arrayPosition = arrayCategories.indexOf(object.category);
        let currentArray = Array.from(skillOptions[arrayPosition]);

        let hasExistingPosition = -1;
        for (var i = 0; i < currentArray.length; i++) {
            if (object.id === currentArray[i].id) {
                hasExistingPosition = i;
            }
        }

        if (hasExistingPosition !== -1) {
            // remove object from array
            currentArray.splice(hasExistingPosition, 1);
        } else {
            // add object to array;
            currentArray.push(object);
        }

        skillOptions[arrayPosition] = currentArray;
        return skillOptions;
    }

    // isNotEmpty = (obj) => {
    //     for (var key in obj) {
    //          if (Object.prototype.hasOwnProperty.call(obj, key)) { return true; }
    //         return false;
    //     }
    // }

    idParser = () => {
        let skills = this.state.CHOSEN_SKILL_ELEMENTS;
        let skillIds = skills.map((skill) => { 
            if (skill === null) {
                return null;
            }
            return skill.id 
        });
        console.log(skillIds);
        return { 
            currentTarget: {
                name: 'skill_ids',
                value: skillIds,
                type: 'skill_setter'
            }
        };
    }

    render() {
        let { SKILL_ELEMENTS, CHOSEN_SKILL_ELEMENTS, OPTION_LENGTH } = this.state;
        let numberedArray = Array.from(Array(OPTION_LENGTH).keys());

        return (
            <div className="skill-setter">
                <div className="skill-options">
                    {
                        SKILL_ELEMENTS.map((category, idx) => {
                            return <RenderSkills
                                key={idx}
                                SKILL_ARRAY={category}
                                addSkillHandler={this.addSkillHandler}
                                removeSkillHandler={this.removeSkillHandler}
                            />
                        })
                    }
                </div>
                <div className="skill-chosen">
                    <div className="skill-containers-empty">
                        {
                            numberedArray.map((num) => {
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
