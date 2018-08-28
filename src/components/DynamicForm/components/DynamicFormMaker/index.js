import React from "react";
import QuestionComponents from "./QuestionComponents";

export default (
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
      ? QuestionComponents.text
      : QuestionComponents[input_type];

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
