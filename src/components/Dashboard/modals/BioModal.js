import React from "react";

//BioModal for Dashboard
const BioModal = ({ user, onChange, errorMessages }) => {
  let { bio } = user;

  return (
    <React.Fragment>
      <div className="edit-modal-item textarea">
        <div className="edit-modal-left">About Me: </div>
        <div className="edit-modal-right">
          <textarea
            placeholder={bio || "Tell us a little about yourself!"}
            rows="10"
            name="bio"
            onChange={onChange}
          />
          <div className="errorMessages">{errorMessages.bio}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BioModal;
