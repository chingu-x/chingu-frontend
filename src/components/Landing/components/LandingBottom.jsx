import * as React from 'react';
import { Link } from "react-router-dom";

export default props => (
  <div className="chingu-bar" >
    <div className="chingu-bar-box" >
      <div className="chingu-bar-title" > Ready To Try Chingu ? </div>
      <button onClick={props.onApplyClick} className="chingu-green-btn" > Apply </button>
    </div>
  </div>
);
