import React from "react";
import "./Requirements.scss";
import { min_requirements, tiers } from "../copywriting";

const Requirements = () => {
  return (
    <section className="requirements-container">
      <section className="requirements">
        <div className="requirements--left">
          <h4 className="landing--minor">{min_requirements.minor}</h4>
          <h1 className="landing--subheader">{min_requirements.header}</h1>
          <h3 className="landing--description">
            {min_requirements.description}
          </h3>
        </div>
      </section>
    </section>
  );
};

const TierRequirements = () => {
  return (
    <section className="tier-requirements-contianer">
      {tiers.map((tier, idx) => {
        return (
          <div key={idx} className={`tier-requirement ${tier.class}`}>
            <div className="landing--h5">{tier.header}</div>
            <div className="landing--description">{tier.description}</div>
          </div>
        );
      })}
    </section>
  );
};
export default Requirements;
