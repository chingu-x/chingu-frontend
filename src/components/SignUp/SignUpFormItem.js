import React from "react";

const SignUpFormItem = props => {
  return (
    <div className="signup-form-item">
      <input
        required
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onBlur={props.onBlur}
      />
      <i className={props.iconName}></i>
      {props.formErrors[props.name] ? <p className="menuErrorMessages">{props.errorMessage}</p> : ""}
    </div>
  );
};

export default SignUpFormItem;
