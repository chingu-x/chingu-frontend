import React from "react";

export default (field_name, options, onFormChange,
    form_data, idx
) => {
  return (
    <React.Fragment>
      <input 
        className="form-input form-datalist" 
        list="options" 
        name={field_name} 
        value={form_data[field_name]}
        id={idx}
        onChange={(e) => onFormChange(e)}
      />
      <datalist id="options">
        {
          options.map(
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
      </datalist>
    </React.Fragment>
  );
}