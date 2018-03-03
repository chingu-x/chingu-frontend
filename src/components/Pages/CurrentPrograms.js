import React from 'react';
import { Link } from "react-router-dom";
import Button from "../common/Button";

const CurrentPrograms = () => {
  return (
    <div className="current-programs">
      <h1>
        Current Programs
      </h1>
      <section>
        <p>Voyage 4 is underway, but it's never too early to sign up for Voyage 5!</p>
        <p>Click the link below to apply for the next build-to-learn cohort starting in May.</p>
        <Link to="/apply"><Button type="button" text="Apply For The Next Voyage" classname="submitBtn" /></Link>
      </section>
      <section>
        <h4>Check back in the future for more information and program updates!</h4>
      </section>
    </div>
  );
}

export default CurrentPrograms;