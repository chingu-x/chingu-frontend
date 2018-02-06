import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import LandingProcessItem from "./LandingProcessItem";
import earth from "../../styles/assets/Global Image-02.png";
import processItems from "./processItems";
import "./Landing.css";

class Landing extends Component {
  state = {};

  renderProcessBar(){
    return _.map(processItems, ({title, image, description}) => {
      return(
        <LandingProcessItem title={title} image={image} description={description}/>
      );
    })
  }

  render() {
    return (
      <div className="landing">
        <div className="landing-top">
          <img className="landing-img" src={earth} alt="" />
          <div className="tagline-box">
            <div className="tagline">Code More</div>
            <div className="tagline">Learn More</div>
            <div className="tagline">Build More</div>
            <Link to="/signup">
              <button className="big-green-btn">Apply</button>
            </Link>
          </div>
        </div>
        <div className="process-bar">
          <div className="process-bar-title">Chingu Process</div>
          <div className="process-bar-items">
            {this.renderProcessBar()}
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
