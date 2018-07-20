import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import LandingIconItem from "./LandingIconItem";
import LandingTestimonial from "./LandingTestimonial";
import earth from "../../styles/assets/Global Image-02.png";
import landingItems from "../../static-api-elements/landingItems";

class Landing extends Component {
  state = {};

  renderProcessBar(){
    return _.map(landingItems.process, ({title, image, description}) => {
      return(
        <LandingIconItem key={title} title={title} image={image} description={description}/>
      );
    })
  }

  renderCohortsBar(){
    return _.map(landingItems.cohorts, ({title, image, description}) => {
      return(
        <LandingIconItem key={title} title={title} image={image} description={description}/>
      );
    })
  }

  renderTestimonialBar(){
    return _.map(landingItems.testimonials, ({username, image, testimonial}) => {
      return(
        <LandingTestimonial key={username} username={username} image={image} testimonial={testimonial}/>
      );
    })
  }

  renderProjectsBar(){
    return _.map(landingItems.projects, ({title, image, description}) => {
      return(
        <LandingIconItem key={title} title={title} image={image} description={description}/>
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
            <Link to="/apply">
              <button className="big-green-btn">Apply</button>
            </Link>
          </div>
        </div>
        <div className="landing-bar">
          <div className="landing-bar-title">Chingu Process</div>
          <div className="landing-bar-items">
            {this.renderProcessBar()}
          </div>
        </div>
        <div className="cohorts-bar">
          <div className="cohorts-bar-title">Current Cohorts</div>
          <div className="cohorts-bar-items">
            {this.renderCohortsBar()}
          </div>
        </div>
        <div className="landing-bar">
          <div className="landing-bar-title">What people are saying about Chingu</div>
          <div className="landing-bar-items">
            {this.renderTestimonialBar()}
          </div>
        </div>
        <div className="projects-bar">
          <div className="projects-bar-title">Past Projects</div>
          <div className="projects-bar-items">
            {this.renderProjectsBar()}
          </div>
        </div>
        <div className="chingu-bar">
          <div className="chingu-bar-box">          
            <h1 className="chingu-bar-title">Chingu</h1>
            <h2 className="chingu-bar-text">Chingu is a global collaboration platform and coding-cohort generator. We connect motivated learners with shared goals to learn, help and build together.</h2>
          </div>
          </div>
      </div>
    );
  }
}

export default Landing;
