import * as React from 'react';
import PropTypes from 'prop-types';

import "./NewsfeedStandup.css";

const sentimentMap = {
  red: 'Trouble Ahead!',
  yellow: 'Nervous',
  green: 'Great!',
};

const responseLabelMap = {
  progress_sentiment: 'Health Status',
  worked_on: 'Worked on',
  working_on: 'Working on',
  blocked_on: 'Blocked on',
}

const classNameSelector = (item, data) => {
  let className = "team-standup-answer";
  if (item === "progress_sentiment") {
    className += ` team-standup-status--${data}`;
  }
  return className;
};

const renderResponses = () => {
  console.log()
  return (
    <React.Fragment>
      <label className="team-standup-label">Recent Standups</label>
      <label className="team-standup-label">All Standups</label>
      <label className="team-standup-label">Missed Standups: nn</label>
    </React.Fragment>
  );
};

const StandupSummary = () => (
  <div className="team-standup-summary-data">
    {renderResponses()}
  </div>
);

StandupSummary.propTypes = {
  standups: PropTypes.array.isRequired,
  updateStandupSelected: PropTypes.func.isRequired,
}

export default StandupSummary;
