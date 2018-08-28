import React from "react";
import questionComponents from "./QuestionComponents";

const dynamicFormMaker = (
  questions,
  form_data,
  onFormChange,
) => questions.map(
  (question) => {
    const {
      text,
      subtext,
      input_type,
      field_name,
    } = question;

    if (input_type === "hidden") return null;

// TODO: support for 'date' type? should be 'text' input but need to confirm formatting
    const QuestionComponent = ["email", "url", "text"].includes(input_type)
      ? questionComponents.text
      : questionComponents[input_type];

    return (
      <div key={"question_" + field_name} className="form-QA">
        <label className="form-question">
          {text}
        </label>
        {subtext ? <div className="form-subtext">{subtext}</div> : null}
        {QuestionComponent(question, onFormChange, form_data)}
      </div>
    );
  },
);

export {
  dynamicFormMaker,
  questionComponents,
};
