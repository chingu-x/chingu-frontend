import React from 'react';
import { 
  questionComponent_checkbox,
  questionComponent_radio,
  questionComponent_radio_special_badge,
  questionComponent_input,
  questionComponent_textarea,
  questionComponent_dropdown,
  questionComponent_dropdown_multiple,
  questionComponent_checkbox_2_column,
  questionComponent_btn_3_options
} from './QuestionComponents';

export function DynamicFormMaker(questions, onFormChange, form_data) {
  return questions.map((question) => {
    let QuestionComponent;
    switch (question.input_type) {
      case 'email':
      case 'url':
      case 'text': // fallthrough with 'input_type' being passed as 'input' attr on component
        QuestionComponent = questionComponent_input;
        break;
      case 'checkbox':
        QuestionComponent = questionComponent_checkbox;
        break;
      case 'radio':
        QuestionComponent = questionComponent_radio;
        break;
      case 'dropdown':
        QuestionComponent = questionComponent_dropdown;
        break;
      case 'textarea':
        QuestionComponent = questionComponent_textarea;
        break;
      case 'checkbox_2_column':
        QuestionComponent = questionComponent_checkbox_2_column;
        break;
  // TODO: cases below are not yet supported by back end 8/4
      case 'dropdown_multiple':
          QuestionComponent = questionComponent_dropdown_multiple;
          break;
      case 'radio_special_badge':
        QuestionComponent = questionComponent_radio_special_badge;
        break;
      case 'button_3_colors':
        QuestionComponent = questionComponent_btn_3_options;
        break;
      default:
        break;
    }
    return (
      <div key={'question_' + question.field_name} className="form-QA">
        <label className="form-question">
          {question.text}
        </label>
        {question.subtext ? <div className="form-subtext">{question.subtext}</div> : null}
        {QuestionComponent(question, onFormChange, form_data)}
      </div>
    )
  })
}