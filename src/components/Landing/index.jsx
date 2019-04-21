import React from "react";
import "./LandingPage.scss";
import Landing from "./components/Landing";
import ChinguValue from "./components/ChinguValue";

const LandingPage = () => {
  return (
    <div className="landing-page--container">
      <Landing />
      <ChinguValue />
    </div>
  );
};
export default LandingPage;
