import * as React from "react";
import DynamicForm from "../DynamicForm";
import './Register.css';
// TODO: refactor the styling
const Register = ({ version, queryString }) => {
  // pattern for manually adding hidden field data (not found in url)
  // alternatively could have 'hidden' prop with object of fields
    // would require parsing QS in the wrapper components (such as Register)
  const timezone = new Date().getTimezoneOffset();
  const qs = `${queryString}&timezone=${timezone}`;
  return (
    <div className="chingu-application-container">
      <div className="chingu-application-modal">
        <div className="chingu-application-title">New User Onboarding Survey</div>
        <DynamicForm
          purpose="chingu_application"
          version={version}
          queryString={qs}
        />
      </div>
    </div>
  );
}

export default Register;
