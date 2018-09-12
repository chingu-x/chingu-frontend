import React from "react";

export default (
  { field_name, options },
  onFormChange,
  form_data,
) => {
  const value = form_data[field_name];
  const dropdownOptions = ["Select an option", ...options];
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
              value={answer.value || answer}
              key={'dropdown_' + field_name + '_' + index}
            >
              {answer.text || answer}
            </option>
          ),
        )
      }
    </select>
  );
}