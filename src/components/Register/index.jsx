import * as React from "react";
import { DynamicForm } from "../DynamicForm";
import './Register.css';
// TODO: refactor the styling
const Register = ({ version }) => {
  // get users local timezone
  const timezone = new Date().getTimezoneOffset();
  return (
    <div className="voyage-application-container">
      <div className="chingu-application-modal">
        <div className="chingu-application-title">New User Onboarding Survey</div>
        <DynamicForm
          purpose="chingu_application"
          version={version}
          hiddenData={{ timezone }}
        />
      </div>
    </div>
  );
}

export default Register;
