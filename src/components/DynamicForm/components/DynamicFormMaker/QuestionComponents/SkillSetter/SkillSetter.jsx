import React from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RenderChosenSkills from './RenderChosenSkills';
import RenderSkills from './RenderSkills';
import { isEqual } from "lodash";

class SkillSetter extends React.Component {
  state = {
    SKILL_ELEMENTS: [],
    CHOSEN_SKILL_ELEMENTS: [],
    OPTION_LENGTH: 5 /* MAGIC NUMBER: SET MAX CHOICES HERE */
  }

  componentDidMount() {
    const { form_data: { skill_ids } } = this.props;
    let { options } = this.props.data;

    const skillCategories = options[0];
    
    const skills = Object.keys(skillCategories).reduce(
      (categories, category) => {
        const filteredCategory = skillCategories[category].filter(
          skill => !skill_ids.some(chosenSkill => chosenSkill && chosenSkill.id === skill.id),
        );
        return [...categories, filteredCategory];
      },
      [],
    );

    this.setState({
      SKILL_ELEMENTS: skills,
      CHOSEN_SKILL_ELEMENTS: skill_ids,
    })
  }

  componentDidUpdate(prevProps) {
    const { form_data: { skill_ids } } = this.props;
    if (isEqual(skill_ids, prevProps.form_data.skill_ids)) return;
    this.setState({ CHOSEN_SKILL_ELEMENTS: skill_ids })
  }

  updateForm = chosenSkills => this.props.onFormChange({ 
    currentTarget: {
      name: 'skill_ids',
      value: chosenSkills,
      type: 'skill_setter'
    }
  });

  setSkillPosition = (chosenSkill, position) => {
    const chosenSkills = this.state.CHOSEN_SKILL_ELEMENTS.slice();
    const currentPosition = this.findCurrentPositionOf(chosenSkill, chosenSkills);

    if (currentPosition !== null) chosenSkills.splice(currentPosition, 1); // remove the old position

    chosenSkills.splice(position, 0, chosenSkill); // insert the skill at the position

    // if the next position is null remove it
    if (chosenSkills[position + 1] === null) chosenSkills.splice(position + 1, 1);

    if (chosenSkills.length > 5) { // remove any skills that extend beyond the 5 choices
      const removedSkill = chosenSkills.pop();
      // if the removed skill was not null add it back to the pool of options
      if (removedSkill !== null) this.updateSkillOptions(removedSkill);
    }
    
    return chosenSkills;
  }

  // add or change position of an item
  addSkillHandler = (position, object) => {
    let chosenSkills = this.state.CHOSEN_SKILL_ELEMENTS;
    if (chosenSkills.indexOf(object) === -1) {
      // if this is the first time the skill object has been added to chosen skills
      this.updateSkillOptions(object);
    }

    chosenSkills = this.setSkillPosition(object, position);
    this.updateForm(chosenSkills);
  }

  removeSkillHandler = (object) => {
    const chosenSkills = this.state.CHOSEN_SKILL_ELEMENTS.slice();
    const position = this.findCurrentPositionOf(object, chosenSkills);
    if (position === null) return;
    chosenSkills[position] = null;

    this.updateSkillOptions(object);
    this.updateForm(chosenSkills);
  }

  checkForNoDuplicates = (object, skill_array) => {
    return skill_array.every(skillObject => {
      if (skillObject === null) { return true };
      return skillObject.id !== object.id;
    })
  }

  findCurrentPositionOf = (object, skill_array) => {
    if (object === null) return null;
    for (var i = 0; i < skill_array.length; i++) {
      const skill = skill_array[i];
      if (skill !== null && object.id === skill_array[i].id) { return i; }
    }

    return null;
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
    this.setState({ SKILL_ELEMENTS: skillOptions });
  }

  render() {
    let { SKILL_ELEMENTS, CHOSEN_SKILL_ELEMENTS, OPTION_LENGTH } = this.state;
    let chosenSkills = Array.from(Array(OPTION_LENGTH).keys());

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
              chosenSkills.map((num) => {
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
