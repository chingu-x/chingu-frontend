import React from "react";

// TODO: add verification of data.

const BioModal = ({user, onChange}) => {
  let {bio} = user;

  return (
    <React.Fragment>
      <textarea placeholder={bio || "Tell us a little about yourself!" }  name="bio" onChange={onChange}/>
    </React.Fragment>
  );
};

export default BioModal;