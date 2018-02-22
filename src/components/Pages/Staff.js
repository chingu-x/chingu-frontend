import React from 'react';
import staffListing from "./stafflisting";
import placeholder from "../../styles/assets/user-placeholder.png";
import staffImages from "../../styles/assets/staffImages/staffImages";

const Staff = () => {

  function renderStaff(name, role, link, image){
    console.log(image);
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

  return (
    <div className="basic-page">
      <h1>The Chingu Team</h1>
      <div className="staff">
        {staffListing.map(({name, role, link, image}) => {return renderStaff(name, role, link, image)})}
      </div>
    </div>
  );
}

export default Staff;