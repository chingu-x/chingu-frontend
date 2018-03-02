import React from "react";

const Button = ({ type, classname, text, onClick }) => {
  return (
    <button type={type} className={classname} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
