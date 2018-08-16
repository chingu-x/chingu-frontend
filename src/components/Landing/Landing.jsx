import * as React from 'react';
import GetUser from "../utilities/GetUser"
import landingQuery from "../../queries/landingQuery"

import CohortsBar from "./components/CohortsBar";
import LandingBar from "./components/LandingBar";
import LandingTop from "./components/LandingTop";
import LandingBottom from "./components/LandingBottom";
import Modal from "../common/Modal"
import GithubLogin from "../Login/components/WithoutToken"

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

const Landing = props => {
  console.log("landing", { props })
  const { user } = props
  return (
    <div className="landing" >
      <Modal open={props.openLoginModal} background="gray"><GithubLogin queryString={props.queryString} /></Modal>

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

export default props =>
  <GetUser query={landingQuery}><Landing {...props} /></GetUser>
