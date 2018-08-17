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

class Landing extends React.Component {
  openLoginModal = () => this.refs.loginModal.open()

  render() {
    console.log("landing", { props: this.props })
    const { user } = this.props
    return (
      <div className="landing" >
        <Modal
          open={this.props.openLoginModal}
          background="gray"
          ref="loginModal"
        >
          <GithubLogin queryString={this.props.queryString} />
        </Modal>

        <LandingTop user={user} onApplyClick={this.openLoginModal} />
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
        {!user && <LandingBottom onApplyClick={this.openLoginModal} />}
      </div>
    )
  }

}

export default props =>
  <GetUser query={landingQuery}><Landing {...props} /></GetUser>
