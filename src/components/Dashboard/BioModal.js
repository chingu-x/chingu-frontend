import React from "react";

// TODO: add verification of data.

const BioModal = ({user, onChange, errorMessages}) => {
  let {bio} = user;

  return (
    <React.Fragment>
      <textarea placeholder={bio || "Tell us a little about yourself!" }  name="bio" onChange={onChange}/>
      <div className="errorMessages">{errorMessages.bio}</div>
    </React.Fragment>
  );
};

export default BioModal;