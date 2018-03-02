import React from "react";
import Button from "../../common/Button";

//Personal Information Frame on Dashboard
const PersonalFrame = ({first_name, last_name, toggleModal}) => {
  return (
    <React.Fragment>
      <div className="dashboard-body-header">
        <h3>Personal Details</h3>
        <Button
          type="button"
          classname="dash-btn"
          onClick={() => toggleModal("personal")}
          text="Edit"
        />
      </div>
      <div className="dashboard-body-item">
        <span className="dashboard-body-left">First Name: </span>
        <span className="dashboard-body-right">{first_name} </span>
      </div>
      <div className="dashboard-body-item">
        <span className="dashboard-body-left">Last Name: </span>
        <span className="dashboard-body-right">{last_name} </span>
      </div>
    </React.Fragment>
  );
};

export default PersonalFrame;
