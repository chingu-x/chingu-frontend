import * as React from "react";

/**
 * TODO:
 * 1. add way to navigate to check in page
 **/

const WeeklyCheckIn = () => {
  return (
    <div className="weekly-checkin-container">
      <a href={"/team/checkin" + this.props.teamId}>Weekly Check-In</a>
    </div>
  );
};

export default WeeklyCheckIn;
