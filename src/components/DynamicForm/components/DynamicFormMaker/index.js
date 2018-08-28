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
