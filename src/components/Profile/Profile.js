import React, { Component } from "react";
import { graphql } from "react-apollo";
import userQuery from "../../queries/profileQuery";
import image from "../../styles/assets/bear8.jpg";

class Profile extends Component {
  state = {};

  renderSkills(skills){
    if(skills.length > 0) {
      Object.keys(skills).map(skill => {
        return (
          <div className="profile-skills">Skills</div>
        );
      })
    } else {
      return <p>No Skills Listed</p>;
    }
  }

  renderCohorts(cohorts){
    if(cohorts.length > 0) {
      Object.keys(cohorts).map(cohort => {
        return (
          <div className="profile-cohort">Cohort</div>
        );
      })
    } else {
      return <p>No Cohorts Yet</p>;
    }
  }

  renderProjects(projects){
    //projects data is currently not flowing
    if(projects.length > 0) {
      Object.keys(projects).map(project => {
        return (
          <div className="profile-project">Project</div>
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
    let {first_name, last_name, github_url, twitter_url, website_url, blog_url, bio, skills, cohorts, projects} = this.props.data.user;
    //for testing purposes
    return (
      <div className="profile">
        <div className="profile-top">
          <img src={image} alt="" className="profile-img" />
          <div className="profile-bio">
            <h1>{first_name} {last_name}</h1>
            <div className="profile-links">
              { github_url ? <a href={github_url} target="_blank">Github</a> : "" }
              { twitter_url ? <a href={twitter_url} target="_blank">Twitter</a> : "" }
              { website_url ? <a href={website_url} target="_blank">Website</a> : "" }
              { blog_url ? <a href={blog_url} target="_blank">Blog</a> : "" }
            </div>
            { bio ? <p>{bio}</p> : <p></p>}
          </div>
        </div>
        { bio ? (<div className="profile-bottom">
          <div className="profile-bottom-left">
            <div className="section-header">Projects</div>
            <div className="profile-skills-list">
              {this.renderProjects(projects)}
            </div>
          </div>
          <div className="profile-bottom-right">
            <div className="section-header">Skills</div>
            <div className="profile-skills-list">
              {this.renderSkills(skills)}
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
