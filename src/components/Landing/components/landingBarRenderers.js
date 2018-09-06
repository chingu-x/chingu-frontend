import * as React from 'react';
import _ from "lodash";

import LandingBarWithIcons from "./LandingBarWithIcons.jsx";
import LandingProjects from "./LandingProjects";
import LandingTestimonial from "./LandingTestimonial";
import landingImages from "../../../styles/assets/landingImages";

const ProcessBar = (process) => {
  return _.map(process, ({
    title,
    image,
    description
  }) => {
    return (
      <div className="landing-item landing-card" >
        <img className="landing-item-image" src={landingImages[image]} alt="" />
        <div className="landing-item-title" >{title}</div>
        <div className="landing-item-description" >{description}</div>
      </div>
    );
  })
}

const WhatMakesChinguUniqueBar = (whatMakesChingUnique) => {
  return _.map(whatMakesChingUnique, ({
    title,
    image,
    description
  }) => {
    return (
      <LandingBarWithIcons
        key={title}
        title={title}
        image={image}
        description={description}
      />
    );
  })
}

const ProgramOverview = (programOverview) => {
  return _.map(programOverview, ({
    title,
    image,
    description
  }) => {
    return (
      <LandingBarWithIcons
        key={title}
        title={title}
        image={image}
        description={description}
      />
    );
  })
}

const TestimonialBar = (testimonials) => {
  return _.map(testimonials, ({
    username,
    image,
    testimonial
  }) => {
    return (
      <LandingTestimonial
        key={username}
        username={username}
        image={image}
        testimonial={testimonial}
      />
    );
  })
}

const ProjectsBar = (projects) => {
  return _.map(projects, ({
    title,
    image,
    description,
    tier,
    techStack
  }) => {
    return (
      <LandingProjects
        key={title}
        title={title}
        image={image}
        description={description}
        tier={tier}
        techStack={techStack}
      />
    );
  })
}

export {
  ProcessBar,
  ProgramOverview,
  ProjectsBar,
  TestimonialBar,
  WhatMakesChinguUniqueBar
};
