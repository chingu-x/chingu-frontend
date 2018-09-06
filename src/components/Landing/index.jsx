import * as React from 'react';
import CohortsBar from "./components/CohortsBar";
import LandingBar from "./components/LandingBar";
import LandingTop from "./components/LandingTop";
import LandingBottom from "./components/LandingBottom";
import Modal from "../common/Modal"
import GithubLoginModal from "../Login/components/GithubLoginModal"

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
  handleApplyClick = () => !!localStorage.token ? this.props.history.push("/voyage") : this.openLoginModal()
  openLoginModal = () => this.refs.loginModal.open()

  render() {
    const authed = !!localStorage.token
    return (
      <div className="landing" >
        {
          !authed &&
          <Modal
            open={!!localStorage.redirect}
            background="transparent"
            ref="loginModal">
            <GithubLoginModal />
          </Modal>
        }

        <LandingTop authed={authed} onApplyClick={this.handleApplyClick} />
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
        {!authed && <LandingBottom onApplyClick={this.handleApplyClick} />}
      </div>
    )
  }
}

export default Landing