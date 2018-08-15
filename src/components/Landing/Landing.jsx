import * as React from 'react';
import GetUser from "../utilities/GetUser"
import landingQuery from "../../queries/landingQuery"

import CohortsBar from "./components/CohortsBar";
import LandingBar from "./components/LandingBar";
import LandingTop from "./components/LandingTop";
import LandingBottom from "./components/LandingBottom";

import {
  process,
  projects,
  testimonials,
  programOverview,
  whatMakesChingUnique,
} from "./components/landingBarItemsData";

import {
  ProcessBar,
  ProjectsBar,
  TestimonialBar,
  ProgramOverview,
  WhatMakesChinguUniqueBar,
} from "./components/landingBarRenderers";

const Landing = ({ user }) => {
  console.log("landing", { user })
  return (
    <div className="landing" >
      <LandingTop user={user} />
      <CohortsBar
        title="What Makes Chingu Unique"
        data={whatMakesChingUnique}
        renderItems={WhatMakesChinguUniqueBar}
      />
      <LandingBar
        title="Chingu Process"
        data={process}
        renderItems={ProcessBar}
      />
      <CohortsBar
        title="Program Overview"
        subtext={["8 Week Build To Learn Voyages", "Part-Time or Full-Time teams"]}
        data={programOverview}
        renderItems={ProgramOverview}
      />
      <LandingBar
        title="Past Projects"
        data={projects}
        renderItems={ProjectsBar}
      />
      <CohortsBar
        title="What People Are Saying About Chingu"
        data={testimonials}
        renderItems={TestimonialBar}
      />
      {!user && <LandingBottom />}
    </div>
  )
}

export default () =>
  <GetUser query={landingQuery}><Landing /></GetUser>
