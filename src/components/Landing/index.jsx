import React from "react";
import "./LandingPage.scss";
import Landing from "./components/Landing";
import ChinguValue from "./components/ChinguValue";
import Requirements from "./components/Requirements";

const LandingPage = () => {
  return (
    <div className="landing-page--container">
      <Landing />
      <ChinguValue />
      <Requirements />
    </div>
  );
};
export default LandingPage;
