import React from "react";
import Button from "../../common/Button";

//Profile Frame on Dashboard
const ProfileFrame = ({
  bio,
  linkedin_url,
  github_url,
  portfolio_url,
  website_url,
  twitter_url,
  blog_url,
  toggleModal
}) => {
  return (
    <React.Fragment>
      <div className="dashboard-body-header">
        <h3>Bio</h3>
        <Button
          type="button"
          classname="dash-btn"
          onClick={() => toggleModal("bio")}
          text="Edit"
        />
      </div>
      <div className="dashboard-body-item">
        <span className="dashboard-body-left">About Me: </span>
        <span className="dashboard-body-right">{bio} </span>
      </div>

      <div className="dashboard-body-header">
        <h3>Links</h3>
        <Button
          type="button"
          classname="dash-btn"
          onClick={() => toggleModal("links")}
          text="Edit"
        />
      </div>
      <div className="dashboard-body-item">
        <span className="dashboard-body-left">LinkedIn: </span>
        <span className="dashboard-body-right">{linkedin_url} </span>
      </div>
      <div className="dashboard-body-item">
        <span className="dashboard-body-left">Github: </span>
        <span className="dashboard-body-right">{github_url} </span>
      </div>
      <div className="dashboard-body-item">
        <span className="dashboard-body-left">Portfolio: </span>
        <span className="dashboard-body-right">{portfolio_url} </span>
      </div>
      <div className="dashboard-body-item">
        <span className="dashboard-body-left">Website: </span>
        <span className="dashboard-body-right">{website_url} </span>
      </div>
      <div className="dashboard-body-item">
        <span className="dashboard-body-left">Twitter: </span>
        <span className="dashboard-body-right">{twitter_url} </span>
      </div>
      <div className="dashboard-body-item">
        <span className="dashboard-body-left">Blog: </span>
        <span className="dashboard-body-right">{blog_url} </span>
      </div>
    </React.Fragment>
  );
};

export default ProfileFrame;
