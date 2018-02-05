import React, { Component } from "react";
import { Link } from "react-router-dom";
import earth from "../../styles/assets/Global Image-02.png";
import "./Landing.css";

class Landing extends Component {
  state = {};
  render() {
    return (
      <div className="landing">
      <img className="landing-img" src={earth} alt="" />
        <div className="tagline-box">
          <div className="tagline">Code More</div>
          <div className="tagline">Learn More</div>
          <div className="tagline">Build More</div>
          <Link to="/signup"><button className="big-green-btn">Apply</button></Link>
        </div>
      </div>
    );
  }
}

export default Landing;
