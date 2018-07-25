import * as React from "react";

/**
 * TODO:
 * 1. allow action to take in arguments
 * 2. add way to navigate to apply page
 **/

const Action = ({ id }) => {
  return (
    <div className="action-container">
      <a href={"/voyage/application/" + id}className="action-button">Apply</a>
      <p className="action-warning">15 spots left</p>
    </div>
  );
};

export default Action;
