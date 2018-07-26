import * as React from "react";

/**
 * TODO:
 * 1. add way to navigate to check in page
 **/

const WeeklyCheckIn = ({ team }) => {
  return (
    <div className="action-button--to-Voyage">
      <a href={"/team/checkin/" + team.cohort.id}>Weekly Check-In</a>
    </div>
  );
};

export default WeeklyCheckIn;
