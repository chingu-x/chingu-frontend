import * as React from 'react';
import landingImages from "../../styles/assets/landingImages";

const LandingProjects = ({ image, title, description, tier, techStack }) => {
  return (
    <div className="landing-item">
      <img className="landing-item-project-image" src={landingImages[image]} alt="" />
      <div className="landing-item-project-info">
        <div className="landing-item-project-title" >{title}</div>
        <div className="landing-item-project-description" >{description}</div>
        <div className="landing-item-project-tier" >{tier}</div>
        {techStack.map((techStack, index) => {
          return (
            <div key={index} className="landing-item-project-techStack">{techStack}</div>
          )
        })}
      </div>
    </div>
  );
}

export default LandingProjects;