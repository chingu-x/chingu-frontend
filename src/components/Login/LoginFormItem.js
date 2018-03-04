import React from "react";

const LoginFormItem = props => {
  return (
    <div className="login-form-item">
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
      <i className={props.iconName}></i>
      {props.formErrors[props.name] ? <p className="menuErrorMessages">{props.errorMessage}</p> : ""}
    </div>
  );
};

export default LoginFormItem;
