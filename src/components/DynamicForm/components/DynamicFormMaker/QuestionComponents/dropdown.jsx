import React from "react";

export default (
  { field_name, options },
  onFormChange,
  form_data,
) => (
  <select
    className="form-dropdown"
    value={form_data[field_name]}
    name={field_name}
    type="dropdown"
    onChange={e => onFormChange(e)}
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