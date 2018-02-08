import React from "react";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <div className="signup">
      <div className="signup-box">
        <h1>CHINGU</h1>
        <h3>Create your profile for the CDN!</h3>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
