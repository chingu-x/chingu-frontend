import * as React from 'react';
import { Link } from "react-router-dom";

export default ({ user }) => (
  <div className="chingu-bar" >
    <div className="chingu-bar-box" >
      <div className="chingu-bar-title" > Ready To Try Chingu ? </div>
      <Link to="/login" >
        <button className="chingu-green-btn" > Apply </button>
      </Link >
    </div>
  </div>
);
