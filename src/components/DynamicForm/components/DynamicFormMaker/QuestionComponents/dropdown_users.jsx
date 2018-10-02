import React from "react";

export default (
  { field_name, options },
  onFormChange,
  form_data,
) => {
  const value = form_data[field_name];
  const dropdownOptions = [...options];
  return (
    <select
      className="form-dropdown"
      value={value}
      name={field_name}
      type="dropdown"
      onChange={onFormChange}
      multiple={false}
    >
      {
        dropdownOptions.map(
          (answer, index) => (
            <option
              className="form-answer"
              value={answer.id}
              key={'dropdown_' + field_name + '_' + index}
            >
              {answer.username}
              <img className="form-answer-user" alt="user" src={answer.avatar} />
              
            </option>
          ),
        )
      }
    </select>
  );
}