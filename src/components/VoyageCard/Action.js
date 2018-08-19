import * as React from "react";
import { Link } from "react-router-dom"

/**
 * TODO:
 * 1. allow action to take in arguments
 * 2. add way to navigate to apply page
 **/

const Action = ({ id, action }) => {
  return (
    <div className="action-container">
      <Link to={"/voyage/application/" + id}className="action-button">Apply</Link>
      <p className="action-warning">{action}</p>
    </div>
  );
};

export default Action;
