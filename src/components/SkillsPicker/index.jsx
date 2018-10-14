import React from "react";
import PropTypes from "prop-types"
import CreatableSelect from 'react-select/lib/Creatable';
import Request from "../utilities/Request";
import { gql } from "apollo-boost";
import { client } from "../../";


const skillsPickerQuery = gql`
  query skillsPickerQuery {
    skills {
      id
      name
      category
    }
  }
`;



class SkillsPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      options: null,
      selectedSkills: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { currentSkills, data } = this.props;
    const options = this._mapSkillsOptions(currentSkills, data.skills);
    return this.setState({ options });
  }

  createSkillRequest = (skill) => {
    // TODO: implement skill request mutation on API
    console.log('create skill request: ', skill);
    // const { client } = this.props;
    // const mutation = createSkillRequestMutation;
    // const variables = { name: skill.name };
    // client.mutate({ mutation, variables})
    //   .then(this._updateLocalStorage)
    //   .catch(this.handleError);
  }

  addNewSkill = (requestedSkill, selectedSkills) => {
    this.createSkillRequest(requestedSkill);
    return [...selectedSkills, { label: requestedSkill, value: null }];
  }

  _updateLocalStorage = (data) => {
    const { skillRequest } = data;
    const savedSkills = localStorage.getItem('userRequestedSkills');
    const requestedSkills = savedSkills ? JSON.parse(savedSkills) : {};
    const saveData = JSON.stringify([skillRequest, ...requestedSkills ]);
    localStorage.setItem('userRequestedSkills', saveData);
  }

  _mapSkillsOptions(sourceSkills, allSkills) {
    const potentialSkills = allSkills.filter(
      // filter out any skills that already exist on the source (user or project)
      skill => !sourceSkills.some(sourceSkill => sourceSkill.id === skill.id),
    );

    return potentialSkills.map(skill => ({ label: skill.name, value: skill.id }));
  }

  handleKeyDown = (event) => {
    const { input, selectedSkills } = this.state;
    if (!input) return;

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.setState({
          input: '',
          selectedSkills: this.addNewSkill(input, selectedSkills),
        });
        event.preventDefault();
    }
  };

  handleChange = (selectedSkills) => this.setState({ selectedSkills });

  handleInputChange = (input) => this.setState({ input });

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedSkills } = this.state;
    const skill_ids = selectedSkills.reduce(
      // ignore new skill requests (with value: null)
      (ids, skill) => skill.value ? [skill.value, ...ids] : ids,
      [],
    );
    const mutation = gql`
      mutation userAddSkills ($skill_ids:[ID!]!) {
        userAddSkills(skill_ids:$skill_ids) {
          id
          skills {
            id
            name
            category
          }
        }
      }
    `;

    client.mutate({ mutation, variables: { skill_ids } })
      .catch(console.error); // TODO: error handling
  }

  render() {
    const { input, options, selectedSkills } = this.state;

    return (
      <form>
        <CreatableSelect
          isMulti
          isClearable
          options={options}
          inputValue={input}
          value={selectedSkills}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <input type="submit" value="Save" onClick={this.handleSubmit} />
      </form>
    );
  }
}

SkillsPicker.propTypes = {
  user: PropTypes.object,
  skills: PropTypes.object,
  client: PropTypes.func,
}

export default props => (
  <Request
    {...props}
    query={skillsPickerQuery}
    component={SkillsPicker}
    loader
  />
);
