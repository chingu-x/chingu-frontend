import * as React from "react";

/**
 * TODO:
 * 1. allow action to take in arguments
 * 2. add way to navigate to apply page
 **/

const Action = () => {
  return (
    <div className="action-container">
      <button className="action-button">Apply</button>
      <p className="action-warning">15 spots left</p>
    </div>
  );
};

export default Action;
