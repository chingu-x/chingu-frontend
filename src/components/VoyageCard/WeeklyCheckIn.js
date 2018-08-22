import * as React from "react";
import { Link } from "react-router-dom"

/**
 * TODO:
 * 1. add way to navigate to check in page
 **/

const WeeklyCheckIn = ({ team }) => {
  return (
    <div className="action-button--to-Voyage">
      <Link to={"/team/checkin/" + team.cohort.id}>Weekly Check-In</Link>
    </div>
  );
};

export default WeeklyCheckIn;
