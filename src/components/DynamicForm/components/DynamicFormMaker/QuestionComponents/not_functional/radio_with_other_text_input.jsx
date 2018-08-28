import React from "react";

// TODO: this is currently unsupported. when its ready notify backend to add to
// question input_type enum
export class RadioWithInputComponent extends React.Component {
  render() {
    const { answer, field_name, index, onFormChange, form_data } = this.props;
    return (
      <div key={'radio-answer_' + field_name + '_' + index} className="radio-container">
        <label className="form-answer" htmlFor={field_name + '_' + index}>
          {answer}
          <input
            className="form-radio"
            type="radio"
            name={field_name}
            id={field_name + '_' + index}
            value={answer}
            checked={form_data[field_name] === answer}
            onChange={e => onFormChange(e)}
          />
          <span className="radio-checkmark" />
        </label>
      </div>
    )
  }
    // render() {
  //     const { answer, field_name, index, onFormChange, form_data } = this.props;
  //     return (
  //         <div key={'radio-answer_' + field_name + '_' + index} className="radio-container">
  //             <input type="text"
  //                 name={field_name}
  //                 value={'Other: ' + form_data[field_name]}
  //                 onChange={e => onFormChange(e)}
  //                 className="form-input"
  //             />
  //             <label className="form-answer" htmlFor={field_name + '_' + index}>
  //                 {answer}
  //                 <input
  //                     className="form-radio"
  //                     type="radio"
  //                     name={field_name}
  //                     id={field_name + '_' + index}
  //                     value={answer}
  //                     checked={form_data[field_name].includes(answer)}
  //                     onChange={e => onFormChange(e)}
  //                 />
  //                 <span className="radio-checkmark" />
  //             </label>
  //         </div>
  //     )
  // }
};
