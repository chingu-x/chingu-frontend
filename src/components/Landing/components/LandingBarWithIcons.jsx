import * as React from 'react';
import landingImages from "../../../styles/assets/landingImages";

export default ({image, title, description}) => (
  <div className="landing-item">
    <img className="landing-item-image" src={landingImages[image]} alt=""/>
    <div className="landing-item-title" >{title}</div>
    <div className="landing-item-description" >{description}</div>
  </div>
);