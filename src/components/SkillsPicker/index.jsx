import React from "react";
import PropTypes from "prop-types"
import CreatableSelect from 'react-select/lib/Creatable';
import Request from "../utilities/Request";
import { gql } from "apollo-boost";
import { client } from "../../";

const mapSkillsOptions = (sourceSkills, allSkills) => allSkills.reduce(
  (options, skill) => {
    const hasSkill = sourceSkills.some(sourceSkill => sourceSkill.id === skill.id);
    // format the skill for the data list
    const formattedSkill = { label: skill.name, value: skill.id };
    // ignore skills the source already owns
    return hasSkill ? options : [...options, formattedSkill];
  },
  [],
);

class SkillsPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      options: null,
      selectedSkills: [],
      isEditing: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { currentSkills, data, isEditing } = this.props;
    const options = mapSkillsOptions(currentSkills, data.skills);
    return this.setState({ options, isEditing });
  }

  componentWillReceiveProps(nextProps) {
    const { isEditing, shouldSave } = nextProps;

    if (isEditing !== this.state.isEditing) this.setState({ isEditing });
    if (shouldSave) this.handleSubmit();
  }

  createSkillRequest = (name) => {
    // TODO: how to handle Project skill requests?
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

  handleSubmit = () => {
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
    const { input, options, selectedSkills, isEditing } = this.state;

    return isEditing && (
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
      </form>
    );
  }
}

SkillsPicker.propTypes = {
  data: PropTypes.object.isRequired, // { skills } from <Request />
  currentSkills: PropTypes.array.isRequired, // source skills (user.skills, project.skills)
  mutation: PropTypes.object.isRequired, // user/projectAddSkills
  variables: PropTypes.objectOf({ project_id: PropTypes.string }),
  isEditing: PropTypes.bool.isRequired,
  shouldSave: PropTypes.bool.isRequired,
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
