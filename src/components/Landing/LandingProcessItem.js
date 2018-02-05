import React from 'react';
import processImages from "../../styles/assets/processImages";

const LandingProcessItem = ({image, title, description}) => {
  return (
    <div className="process-item">
      <img className="process-item-image" src={processImages[image]} alt=""/>
      <div className="process-item-title" >{title}</div>
      <div className="process-item-description" >{description}</div>
    </div>
  );
}

export default LandingProcessItem;