import _ from "lodash";
import * as React from 'react';
import {
  Link
} from "react-router-dom";
import LandingBarWithIcons from "./LandingBarWithIcons";
import LandingTestimonial from "./LandingTestimonial";
import LandingProjects from './LandingProjects';
import landingItems from "../../static-api-elements/landingItems";
import Register from '../Register';
import Login from "../Login";
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      login: false
    }
  }

  componentDidMount() {
    // if the URL has /register , it will set register to true
    if (window.location.pathname.includes('/register')) {
      this.setState({ register: true, login: true })
    }
    if (window.location.pathname === '/login') {
      this.setState({ login: true, register: false })
    }
  }

  renderProcessBar() {
    return _.map(landingItems.process, ({
      title,
      image,
      description
    }) => {
      return ( <
        LandingBarWithIcons key = {
          title
        }
        title = {
          title
        }
        image = {
          image
        }
        description = {
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
      return ( <
        LandingBarWithIcons key = {
          title
        }
        title = {
          title
        }
        image = {
          image
        }
        description = {
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
      return ( <
        LandingBarWithIcons key = {
          title
        }
        title = {
          title
        }
        image = {
          image
        }
        description = {
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
      return ( <
        LandingTestimonial key = {
          username
        }
        username = {
          username
        }
        image = {
          image
        }
        testimonial = {
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
      return ( <
        LandingProjects key = {
          title
        }
        title = {
          title
        }
        image = {
          image
        }
        description = {
          description
        }
        tier = {
          tier
        }
        techStack = {
          techStack
        }
        />
      );
    })
  }

  render() {
    return ( 
    <div className = "landing" >
      {this.state.login ? <Login /> : null}
      {this.state.register ? <Register /> : null}
      <div className = "landing-top" >
        <div className = "tagline-box" >
        <div className = "tagline" > Learn how to be a team developer<br /> & boost your portfolio. </div> 
        <div className = "tagline--subtext" > Gain real project experience with team opportunities </div> 
        <Link to = "/login" >
          <button className = "big-green-btn" > Apply </button> 
        </Link > 
      </div> 
        <img className = "landing-img" src = {require('../../assets/landingImage.png')} alt = "landingImage" />
      </div> 
      <div className = "cohorts-bar" >
        <div className = "cohorts-bar-title" > What Makes Chingu Unique? </div> 
        <div className = "cohorts-bar-items" > {this.renderWhatMakesChinguUniqueBar()} </div> 
      </div > 
      <div className = "landing-bar" >
        <div className = "landing-bar-title" > Chingu Process </div> 
        <div className = "landing-bar-items" > { this.renderProcessBar() } </div> 
      </div > 
      <div className = "cohorts-bar" >
        <div className = "cohorts-bar-title" > Program Overview </div> 
        <div className = "cohorts-bar-items" > {this.renderProgramOverview()} </div> 
      </div > 
      <div className = "landing-bar" >
        <div className = "landing-bar-title" > Past Projects </div> 
        <div className = "landing-bar-items" > {this.renderProjectsBar()} </div> 
      </div > 
      <div className = "cohorts-bar" >
        <div className = "cohorts-bar-title" > What people are saying about Chingu </div> 
        <div className = "cohorts-bar-items" > {this.renderTestimonialBar()} </div> 
      </div > 
      <div className = "chingu-bar" >
      <div className = "chingu-bar-box" >
        <div className = "chingu-bar-title" > Ready To Try Chingu ? </div>
          <Link to = "/login" >
            <button className = "chingu-green-btn" > Apply </button> 
          </Link > 
        </div>
      </div> 
    </div>
    );
  }
}

export default Landing;
