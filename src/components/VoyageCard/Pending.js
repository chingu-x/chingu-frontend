import * as React from "react";

/**
 * TODO:
 * 1. add way to navigate to check in page
 **/

const Pending = ({ status }) => {
  return (
    <div className="action-button--to-Voyage action-btn-done">
      {status}
    </div>
  );
};

export default Pending;
