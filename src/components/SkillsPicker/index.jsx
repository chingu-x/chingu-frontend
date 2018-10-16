import React from "react";
import PropTypes from "prop-types"
import CreatableSelect from 'react-select/lib/Creatable';
import Request from "../utilities/Request";
import { gql } from "apollo-boost";
import { client } from "../../";

const mapSkillsOptions = (sourceSkills, allSkills) => {
  const options = allSkills.filter(
    // filter out any skills that already exist on the source (user or project)
    skill => !sourceSkills.some(sourceSkill => sourceSkill.id === skill.id),
  );

  return options.map(skill => ({ label: skill.name, value: skill.id }));
}

class SkillsPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      options: null,
      selectedSkills: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { currentSkills, data } = this.props;
    const options = mapSkillsOptions(currentSkills, data.skills);
    return this.setState({ options });
  }

  createSkillRequest = (name) => {
    const mutation = gql`
      mutation createSkillRequest($name: String!) {
        requestedSkillCreate(name:$name) {
          id
          requested_skills {
            id
            name
          }
        }
      }
    `;

    client.mutate({ mutation, variables: { name } })
      .catch(console.error); // TODO: handle error
  }

  createSkillRequests = (requestedSkills) => Promise.all(
    requestedSkills.map(skill => this.createSkillRequest(skill.label)),
  );

  addNewSkill = (requestedSkill, selectedSkills) => {
    // set the value to be unique (for ability to remove option before saving)
    // prefix with 'requested' to filter api skills vs requests during submit
    const value = `requested-${requestedSkill}`;
    return [...selectedSkills, { label: requestedSkill, value }];
  }

  resetFormState = () => this.setState({ input: '', selectedSkills: [] })

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

    // handle user requested skills
    const requestedSkills = selectedSkills.filter(skill => skill.value.includes('-'));
    this.createSkillRequests(requestedSkills).catch(console.error) // TODO: handle error

    // handle user selected skills
    const { mutation } = this.props;
    const variables = this.props.variables || {};
    variables.skill_ids = selectedSkills.reduce(
      // ignore skill requests (with value: requested-SkillName)
      (ids, skill) => skill.value.includes('-') ? ids : [skill.value, ...ids],
      [],
    );

    client.mutate({ mutation, variables })
      .then(this.resetFormState)
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
  data: PropTypes.object.isRequired, // { skills } from <Request />
  currentSkills: PropTypes.array.isRequired, // source skills (user.skills, project.skills)
  mutation: PropTypes.object.isRequired, // user/projectAddSkills
  variables: PropTypes.objectOf({ project_id: PropTypes.string }),
};

const skillsPickerQuery = gql`
  query skillsPickerQuery {
    skills {
      id
      name
      category
    }
  }
`;

export default props => (
  <Request
    {...props}
    query={skillsPickerQuery}
    component={SkillsPicker}
    loader
  />
);
