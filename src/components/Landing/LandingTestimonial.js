import React from "react";
import landingImages from "../../styles/assets/landingImages";

const LandingTestimonial = ({ username, image, testimonial }) => {
  return (
    <div className="testimonial">
      <div className="testimonial-box">
        <div className="testimonial-text">{testimonial}</div>
      </div>
      <div className="testimonial-lower">
        <img
          className="testimonial-img"
          src={landingImages[image]}
          alt={image}
        />
        <div className="testimonial-username">{username}</div>
      </div>
    </div>
  );
};

export default LandingTestimonial;
