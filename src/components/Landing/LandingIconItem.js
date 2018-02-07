import React from 'react';
import landingImages from "../../styles/assets/landingImages";

const LandingIconItem = ({image, title, description}) => {
  return (
    <div className="landing-item">
      <img className="landing-item-image" src={landingImages[image]} alt=""/>
      <div className="landing-item-title" >{title}</div>
      <div className="landing-item-description" >{description}</div>
    </div>
  );
}

export default LandingIconItem;