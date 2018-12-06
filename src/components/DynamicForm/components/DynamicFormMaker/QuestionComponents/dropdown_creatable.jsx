import React from "react";
import CreatableSelect from 'react-select/lib/Creatable';

const dropdown_creatable = (
  { field_name, input_type, options, isMulti },
  onFormChange,
  form_data,
) => {
  let state = {
    input: '',
    ...form_data
  };
  // map to React-Select option format
  const mappedOptions = options.map(({ text, value }) => ({ label: text, value }));
  const value = form_data[field_name];
  // React-Select wants {label, value} for value prop
  // have to find corresponding label for the chosen value to render properly
  const option = mappedOptions.find(el => el.value === value);
  const label = option ? option.label : '';

  addNewSkill = (requestedSkillName) => {
    const { selectedSkills } = this.state;
    // set the value to be unique (for ability to remove option before saving)
    // prefix with 'requested' to filter api skills vs requests during submit
    const value = `requested-${requestedSkillName}`;
    return [...selectedSkills, { label: requestedSkillName, value }];
  }

  handleCreateInput = (requestedSkillName) => {
    this.setState({
      input: '',
      selectedSkills: this.addNewSkill(requestedSkillName),
    });
  };

  handleInputChange = (e) => {
    let { inputValue } = e.currentTarget;
    state.input = inputValue;
  }

  return (
    <CreatableSelect
      isMulti={isMulti}
      escapeClearsValue={true}
      isClearable={true}
      isSearchable={true}
      name={field_name}
      options={mappedOptions}
      inputValue={input}
      value={{ label, value }}
      onCreateOption={this.handleCreateInput}
      onInputChange={this.handleInputChange}
      onChange={
        (target) => {
          // React-Select handles event targets internally
          // shape currentTarget from their format
          let value;
          if (!target || Array.isArray(target)) value = '';
          else value = target.value;
          const currentTarget = {
            value,
            name: field_name,
            type: input_type,
          };

          return onFormChange({ currentTarget })
        }
      }
    />
  );
};

export default dropdown_creatable;