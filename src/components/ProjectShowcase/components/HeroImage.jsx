import * as React from 'react';

function HeroImage() {
  return (
    <div className="hero-image-container">
      <img 
        className="hero-image" 
        src={require('../../../assets/placeholder image.png')}
        alt=""/>
    </div>
  )
}

export default HeroImage;