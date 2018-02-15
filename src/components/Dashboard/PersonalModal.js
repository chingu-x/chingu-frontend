import React from "react";

// TODO: add verification of data.
// Do we want additional information?

const PersonalModal = ({user, onChange}) => {
  let {first_name, last_name} = user;

  return (
    <React.Fragment>
      <input type="text" placeholder={first_name || "First Name"}  name="first_name" onChange={onChange}/>
      <input type="text" placeholder={last_name || "Last Name"}  name="last_name" onChange={onChange}/>
    </React.Fragment>
  );
};

export default PersonalModal;