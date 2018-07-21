import _ from "lodash";
import * as React from 'react';
import {
  Link
} from "react-router-dom";
import LandingIconItem from "./LandingIconItem";
import LandingTestimonial from "./LandingTestimonial";
import earth from "../../styles/assets/Global Image-02.png";
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
    console.log(window.location.pathname.includes('/register'));
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
        LandingIconItem key = {
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

  renderCohortsBar() {
    return _.map(landingItems.cohorts, ({
      title,
      image,
      description
    }) => {
      return ( <
        LandingIconItem key = {
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
      description
    }) => {
      return ( <
        LandingIconItem key = {
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

  render() {
    return ( 
    <div className = "landing" >
      <div className = "landing-top" >
        <div className = "tagline-box" >
        <div className = "tagline" > Code More </div> 
        <div className = "tagline" > Learn More </div> 
        <div className = "tagline" > Build More </div> 
        <Link to = "/login" >
          <button className = "big-green-btn" > Apply </button> 
        </Link > 
      </div> 
        <img className = "landing-img" src = {earth} alt = "" />
      </div> 
      <div className = "landing-bar" >
        <div className = "landing-bar-title" > Chingu Process </div> 
        <div className = "landing-bar-items" > { this.renderProcessBar() } </div> 
      </div > 
      <div className = "cohorts-bar" >
        <div className = "cohorts-bar-title" > Current Cohorts </div> 
        <div className = "cohorts-bar-items" > {this.renderCohortsBar()} </div> 
      </div > 
      <div className = "landing-bar" >
        <div className = "landing-bar-title" > What people are saying about Chingu </div> 
        <div className = "landing-bar-items" > {this.renderTestimonialBar()} </div> 
      </div > 
      <div className = "projects-bar" >
        <div className = "projects-bar-title" > Past Projects </div> 
        <div className = "projects-bar-items" > {this.renderProjectsBar()} </div> 
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
