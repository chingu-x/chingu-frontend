import React from "react";

const FormButton = ({ color, onClick, data, id }) => {
  return (
    <input
      className={"btn-3 " + color}
      type="button"
      value={data}
      onClick={e => onClick(e)}
      name={id}
    />
  );
}

const team_progress_sentiment_buttons = (data, onFormChange, form_data) => {
  return (
    <div className="btn-container--3">
      {data.options.map((answer, index) => {
        return (
          <FormButton
            id={data.field_name}
            key={index}
            color={form_data[data.field_name] === answer ? 'btn-3--' + answer : ''}
            onClick={onFormChange}
            data={answer}
          />
        )
      })}
    </div>
  )
}

export default team_progress_sentiment_buttons;
