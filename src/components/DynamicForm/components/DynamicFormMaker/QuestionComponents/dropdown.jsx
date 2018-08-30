import React from "react";

export default (
  { field_name, options },
  onFormChange,
  form_data,
) => {
  const value = form_data[field_name];
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
        options.map(
          (answer, index) => (
            <option
              className="form-answer"
              value={answer}
              key={'dropdown_' + field_name + '_' + index}
            >
              {answer}
            </option>
          ),
        )
      }
    </select>
  );
}