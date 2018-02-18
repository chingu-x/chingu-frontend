import React, { Component } from "react";
import { graphql } from "react-apollo";
import userQuery from "../../queries/profileQuery";
import CohortDisplay from "./CohortDisplay";
import ProjectDisplay from "./ProjectDisplay";
import image from "../../styles/assets/bear8.jpg";

class Profile extends Component {
  state = {};

  // Render skills boxes.  Skill currently not implemented.
  renderSkills(skills){
    if(skills.length > 0) {
      return Object.keys(skills).map(skill => {
        return (
          <div key={skill} className="profile-skills">Skills</div>
        );
      })
    } else {
      return <p>Skills are on their way!</p>;
    }
  }

  // Render cohort boxes.
  renderCohorts(cohorts){
    if(cohorts.length > 0) {
      return Object.keys(cohorts).map(cohort => {
        return (
          <div key={cohort} className="profile-cohort">
            <CohortDisplay cohort={cohorts[cohort]}/>
          </div>
        );
      })
    } else {
      return <p>No Cohorts Yet</p>;
    }
  }

  // Render project boxes.  Project images not implemented yet.
  renderProjects(projects){
    //projects data is currently not flowing
    if(projects.length > 0) {
      return Object.keys(projects).map(project => {
        return (
          <div key={project} className="profile-project">
            <ProjectDisplay project={projects[project]}/>
          </div>
        );
      })
    } else {
      return <p>No Projects Listed</p>;
    }
  }

  render() {
    let { loading, error, user } = this.props.data;
    if (loading) {
      return (
        ""
      );
    } else if (error) {
      return (
          <h1>An error ocurred</h1>
      );
    } else if (!user) {
      return (
          <h1>User not found</h1>
      );
    } 
    let {first_name, last_name, github_url, twitter_url, website_url, blog_url, linkedin_url, portfolio_url, bio, skills, cohorts, projects} = this.props.data.user;

    // TODO: Verify order of links. 
    return (
      <div className="profile">
        <div className="profile-top">
          <img src={image} alt="" className="profile-img" />
          <div className="profile-info">
            <h1>{first_name} {last_name}</h1>
            <div className="profile-links">
              { github_url ? <a href={github_url} target="_blank">Github</a> : "" }
              { linkedin_url ? <a href={linkedin_url} target="_blank">LinkedIn</a> : "" }
              { twitter_url ? <a href={twitter_url} target="_blank">Twitter</a> : "" }
              { website_url ? <a href={website_url} target="_blank">Website</a> : "" }
              { portfolio_url ? <a href={portfolio_url} target="_blank">Portfolio</a> : "" }
              { blog_url ? <a href={blog_url} target="_blank">Blog</a> : "" }
            </div>
            </div>
            </div>
        { bio ? <div className="profile-bio">{bio}</div> : null}
        { bio ? (<div className="profile-bottom">
          <div className="profile-section profile-bottom-left">
            <div className="section-header">Projects</div>
            <div className="profile-projects-list">
              {this.renderProjects(projects)}
            </div>
          </div>
          <div className="profile-section profile-bottom-right">
            <div className="section-header">Skills</div>
            <div className="profile-skills-list">
              Skills are on their way!
              {/*{this.renderSkills(skills)}  // Skills are being populated currently.*/} 
            </div>
            <div className="section-header">Cohorts</div>
            <div className="profile-cohorts-list">
              {this.renderCohorts(cohorts)}
            </div>
          </div>
    </div>) : (<div className="under-construction">
    <h2>Coming Soon</h2>
    <p>Profile information is on the way!</p>
  </div>)}
      </div>
    );
  }
}

export default graphql(userQuery, {
  options: ownProps => ({
    variables: {
      username: ownProps.match.params.username
    }
  })
})(Profile);
