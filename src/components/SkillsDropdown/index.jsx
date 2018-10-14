import React from "react";
import CreatableSelect from 'react-select/lib/Creatable';

import { DynamicFormContainer } from "../DynamicForm/";
import Request from "../utilities/Request";
import { gql } from "apollo-boost";


const userSkillsDropdownQuery = gql`
  query userSkillsDropdownQuery {
    user {
      id
      skills {
        id
        name
      }
    }

    skills {
      id
      name
    }
  }
`;



class SkillsUpdater extends React.Component {
  state = {
    input: '',
    options: null,
    selectedSkills: null,
  };

  componentDidMount() {
    const { user, skills } = this.props;
    const options = this._mapSkillsOptions(user.skills, skills);
    return this.setState({ options });
  }

  createSkillRequest = (skill) => {
    const { client } = this.props;
    // const mutation = createSkillRequestMutation;
    const variables = { name: skill.name };
    // client.mutate({ mutation, variables})
    //   .then(this.renderSkillRequestSuccess)
    //   .catch(this.handleError);
  }

  addSkill = (selectedSkill, selectedSkills) => {
    const { options } = this.state;
    const existingSkill = options.find(skill => skill.id === selectedSkill.value);
    // create skill request feedback issue
    if (!existingSkill) {
      this.createSkillRequest(selectedSkill);
      return selectedSkills;
    }
    const skill = { label: existingSkill.name, value: existingSkill.id };
    return [...selectedSkills, skill];
  }

  _mapSkillsOptions(sourceSkills, allSkills) {
    const potentialSkills = allSkills.filter(
      // filter out any skills that already exist on the source (user or project)
      skill => !sourceSkills.some(sourceSkill => sourceSkill.id === skill.id),
    );

    return potentialSkills.map(skill => ({ label: skill.name, value: skill.id }));
  }

  handleKeyDown = (event) => {
    event.preventDefault();
    const { input, selectedSkills } = this.state;
    if (!input) return;

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.setState({
          input: '',
          selectedSkills: this.addSkill(input),
        });
    }
  };

  handleChange(skill_id) {
    const selectedSkills = [skill_id, ...this.state.selectedSkills];
    return this.setState({ selectedSkills });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { selectedSkills } = this.state; 
    console.log(form_data);
  }

  render() {
    const { input, selectedSkills } = this.state;
    const { user, skills } = this.props.data;

    const options = this._mapSkillsOptions(user.skills, skills);
    const skillsQuestions = [{
      text: "Select skills to add to your profile",
      input_type: "dropdown_with_input",
      field_name: "skills",
      options,
    }];

    return (
      <form>
        <CreatableSelect
          isMulti
          isClearable
          inputValue={input}
          value={selectedSkills}
          onChange={this.handleChange}
          onCreateOption={this.handleCreate}
          onKeyDown={this.handleKeyDown}
        />
        <input type="submit" value="Save" onClick={this.handleSubmit} />
      </form>
    );
  }
}

SkillsUpdater.propTypes = {
  user: PropTypes.object,
  skills: PropTypes.object,
  client: PropTypes.func,
}

export default props => (
  <Request
    {...props}
    query={userSkillsDropdownQuery}
    component={SkillsDropdown}
    loader
  />
);
