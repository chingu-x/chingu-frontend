import React from 'react';
import { 
  answerCreator_checkbox,
  answerCreator_radio,
  answerCreator_radio_special_badge,
  answerCreator_input,
  answerCreator_textarea,
  answerCreator_dropdown,
  answerCreator_dropdown_multiple,
  answerCreator_checkbox_2_column,
  answerCreator_btn_3_options
} from './AnswerTypes/AnswerTypes';

export function renderQAs(applicationData, onFormChange, state) {
  return applicationData.map((setOfQuestionAnswer) => {
    let answerComponent;
    switch (setOfQuestionAnswer.type) {
      case 'checkbox':
        answerComponent = answerCreator_checkbox;
        break;
      case 'input':
        answerComponent = answerCreator_input;
        break;
      case 'radio':
        answerComponent = answerCreator_radio;
        break;
      case 'dropdown':
        answerComponent = answerCreator_dropdown;
        break;
      case 'dropdown-multiple':
        answerComponent = answerCreator_dropdown_multiple;
        break;
      case 'textarea':
        answerComponent = answerCreator_textarea;
        break;
      case 'checkbox-2-column':
        answerComponent = answerCreator_checkbox_2_column;
        break;
      case 'radio-special-badge':
        answerComponent = answerCreator_radio_special_badge;
        break;
      case 'button-3-colors':
        answerComponent = answerCreator_btn_3_options;
        break;
      default:
        break;
    }
    return (
      <div key={'question_' + setOfQuestionAnswer.id} className="form-QA">
        <label className="form-question">
          {setOfQuestionAnswer.question}
        </label>
        {setOfQuestionAnswer.subtext ? <div className="form-subtext">{setOfQuestionAnswer.subtext}</div> : null}
        {answerComponent(setOfQuestionAnswer, onFormChange, state)}
      </div>
    )
  })
}