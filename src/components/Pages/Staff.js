import React from 'react';
import staffListing from "../../static-api-elements/staffListing";
import contributorListing from "../../static-api-elements/contributorListing";
import placeholder from "../../styles/assets/user-placeholder.png";
import staffImages from "../../styles/assets/staffImages/staffImages";

const Staff = () => {

  function renderStaff(name, role, link, image){
    return (
      <div key={name} className="staff-item">
        <a href={link}><img src={staffImages[image] || placeholder} alt={name} /></a>
        <div className="staff-desc">
          <h3>{name}</h3>
          <h4>{role}</h4>
        </div>
      </div>
    );
  }

  function renderContributors(name, github, contribution){
    return (
      <div key={name} className="contributor-item">
        <div className="contributor-name"><a href={github}>{name}</a></div>
        <div className="contributor-desc">{contribution}</div>
      </div>
    )
  }

  return (
    <div className="basic-page">
      <h1>The Chingu Team</h1>
      <div className="staff">
        {staffListing.map(({name, role, link, image}) => {return renderStaff(name, role, link, image)})}
      </div>
      <div className="contributors">
        <h3>Contributors</h3>
        {contributorListing.map(({name, github, contribution}) => {return renderContributors(name, github, contribution)})}
      </div>
    </div>
  );
}

export default Staff;