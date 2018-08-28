import React from 'react';

const CheckboxComponent = (
  { answer, field_name, index, onFormChange, form_data },
) => (
  <div key={'checkbox-answer_' + field_name + '_' + index} className="checkbox-container">
    <label className="form-checkbox-answer" htmlFor={field_name + '_' + index}>
      {answer}
      <input
        type="checkbox"
        name={field_name}
        value={answer}
        id={field_name + '_' + index}
        checked={form_data[field_name].indexOf(answer) !== -1} // is answer in answers array
        onChange={e => onFormChange(e)}
      />
      <span className="checkmark" />
    </label>
  </div>
);

export { CheckboxComponent };

// maps over options array creating Checkbox components
export default (
  { field_name, options },
  onFormChange,
  form_data,
) => options.map(
  (answer, index) => (
    <CheckboxComponent
      key={field_name + '_' + index}
      answer={answer}
      field_name={field_name}
      index={index}
      onFormChange={onFormChange}
      form_data={form_data}
    />
  ),
);
