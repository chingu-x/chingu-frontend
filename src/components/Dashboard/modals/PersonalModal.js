import React from "react";

//Personal Information Modal for Dashboard
const PersonalModal = ({ user, onChange, errorMessages }) => {
  let { first_name, last_name } = user;

  return (
    <React.Fragment>
      <div className="edit-modal-item">
        <div className="edit-modal-left">First Name: </div>
        <div className="edit-modal-right">
          <input
            type="text"
            placeholder={first_name || "First Name"}
            name="first_name"
            onChange={onChange}
          />
          <div className="errorMessages">{errorMessages.first_name}</div>
        </div>
      </div>
      <div className="edit-modal-item">
        <div className="edit-modal-left">Last Name: </div>
        <div className="edit-modal-right">
          <input
            type="text"
            placeholder={last_name || "Last Name"}
            name="last_name"
            onChange={onChange}
          />
          <div className="errorMessages">{errorMessages.last_name}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalModal;
