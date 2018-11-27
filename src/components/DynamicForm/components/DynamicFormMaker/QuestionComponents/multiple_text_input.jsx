import React from "react";
import text from "./text";

const multiple_text_input = (data, onFormChange, form_data) => {
  console.log({ data, onFormChange, form_data })
  return (
    <div className="btn-container--3">
      {data.options.map((answer, index) => {
        return;
      })}
    </div>
  )
}

export default multiple_text_input;
