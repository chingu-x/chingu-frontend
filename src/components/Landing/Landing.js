import _ from "lodash";
import * as React from 'react';
import {
  Link
} from "react-router-dom";
import LandingBarWithIcons from "./LandingBarWithIcons";
import LandingTestimonial from "./LandingTestimonial";
import LandingProjects from './LandingProjects';
import landingItems from "../../static-api-elements/landingItems";
// TODO: uncomment after refactoring for dynamic forms
// import Register from '../Register';
import Login from "../Login";
import Store from "../../AppGlobalStore";
class Landing extends React.Component {
  renderProcessBar() {
    return _.map(landingItems.process, ({
      title,
      image,
      description
    }) => {
      return (<
        LandingBarWithIcons key={
          title
        }
        title={
          title
        }
        image={
          image
        }
        description={
          description
        }
      />
      );
    })
  }

  renderWhatMakesChinguUniqueBar() {
    return _.map(landingItems.whatMakesChingUnique, ({
      title,
      image,
      description
    }) => {
      return (<
        LandingBarWithIcons key={
          title
        }
        title={
          title
        }
        image={
          image
        }
        description={
          description
        }
      />
      );
    })
  }

  renderProgramOverview() {
    return _.map(landingItems.programOverview, ({
      title,
      image,
      description
    }) => {
      return (<
        LandingBarWithIcons key={
          title
        }
        title={
          title
        }
        image={
          image
        }
        description={
          description
        }
      />
      );
    })
  }

  renderTestimonialBar() {
    return _.map(landingItems.testimonials, ({
      username,
      image,
      testimonial
    }) => {
      return (<
        LandingTestimonial key={
          username
        }
        username={
          username
        }
        image={
          image
        }
        testimonial={
          testimonial
        }
      />
      );
    })
  }

  renderProjectsBar() {
    return _.map(landingItems.projects, ({
      title,
      image,
      description,
      tier,
      techStack
    }) => {
      return (<
        LandingProjects key={
          title
        }
        title={
          title
        }
        image={
          image
        }
        description={
          description
        }
        tier={
          tier
        }
        techStack={
          techStack
        }
      />
      );
    })
  }

  render() {
    let modalPrompt = null;
    if (window.location.pathname.includes('/register')) {
      // TODO: uncomment after refactoring to dynamic forms
      // modalPrompt = <Register />;
    }
    else if (window.location.pathname === '/login') {
      modalPrompt = <Login />;
    }

    return (
      <div className="landing" >
        {modalPrompt}
        <div className="landing-top" >
          <div className="tagline-box" >
            <div className="tagline" >Get out of tutorial purgatory. </div>
            <div className="tagline--subtext" >Learn how to be a team developer & boost your portfolio.</div>
            {Store.state.user
              ? null
              : <Link to="/login" >
                <button className="big-green-btn">Apply</button>
              </Link >
            }
          </div>
          <img className="landing-img" src={require('../../assets/landingImage.png')} alt="landingImage" />
        </div>
        <div className="cohorts-bar" >
          <div className="cohorts-bar-title" > What Makes Chingu Unique </div>
          <div className="cohorts-bar-items" > {this.renderWhatMakesChinguUniqueBar()} </div>
        </div >
        <div className="landing-bar" >
          <div className="landing-bar-title" > Chingu Process </div>
          <div className="landing-bar-items" > {this.renderProcessBar()} </div>
        </div >
        <div className="cohorts-bar" >
          <div className="cohorts-bar-title" > Program Overview </div>
          <div className="cohorts-bar-subtitle" > 8 Week Build To Learn Voyages <br /> Part-Time or Full-Time teams</div>
          <div className="cohorts-bar-items" > {this.renderProgramOverview()} </div>
        </div >
        <div className="landing-bar" >
          <div className="landing-bar-title" > Past Projects </div>
          <div className="landing-bar-items" > {this.renderProjectsBar()} </div>
        </div >
        <div className="cohorts-bar" >
          <div className="cohorts-bar-title" > What People Are Saying About Chingu </div>
          <div className="cohorts-bar-items" > {this.renderTestimonialBar()} </div>
        </div >
        {Store.state.user
          ? null
          : <div className="chingu-bar" >
            <div className="chingu-bar-box" >
              <div className="chingu-bar-title" > Ready To Try Chingu ? </div>
              <Link to="/login" >
                <button className="chingu-green-btn" > Apply </button>
              </Link >
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Landing;
