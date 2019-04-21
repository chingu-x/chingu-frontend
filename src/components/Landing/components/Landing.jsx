import React from "react";
import "./Landing.scss";
import { tagline } from "../copywriting";

const Landing = () => {
  return (
    <section className="landing--container">
      <section className="landing">
        <section className="landing-text">
          <h1 className="landing-text--header landing--header">
            {tagline.header}
          </h1>
          <h3 className="landing-text--description landing--description">
            {tagline.description}
          </h3>
          <button className="landing-text--btn">Join For Free</button>
        </section>
        <img className="landing-img" src={require("assets/landing.png")} />
      </section>
    </section>
  );
};

export default Landing;
