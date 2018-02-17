import React from "react";

// TODO: add verification of data.
// Do we want additional information?

const PersonalModal = ({user, onChange, errorMessages}) => {
  let {first_name, last_name} = user;

  return (
    <React.Fragment>
    <div>  
    <input type="text" placeholder={first_name || "First Name"}  name="first_name" onChange={onChange}/>
    <div className="errorMessages">{errorMessages.first_name}</div>
    </div>
      <div>
      <input type="text" placeholder={last_name || "Last Name"}  name="last_name" onChange={onChange}/>
      <div className="errorMessages">{errorMessages.last_name}</div>
      </div>
    </React.Fragment>
  );
};

export default PersonalModal;