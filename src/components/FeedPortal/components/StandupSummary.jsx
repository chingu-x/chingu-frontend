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

const formatStandupId = (standup) => {
  return new Date(standup.submitted_at).toLocaleDateString()
    + ' - ' + standup.member.username;
}

const renderResponses = (props) => {
  console.log('props: ', props);
  return (
    <React.Fragment>
      <label className="team-standup-label">Recent Standups</label>
      <div className="team-standup-id">{ formatStandupId(props.standups[props.standups.length-1]) }</div>
      <label className="team-standup-label team-standup-label--padtop">All Standups</label>
      <label className="team-standup-label team-standup-label--padtop">Missed Standups: nn</label>
    </React.Fragment>
  );
};

const StandupSummary = (props) => (
  <div className="team-standup-summary-data">
    {renderResponses(props)}
  </div>
);

StandupSummary.propTypes = {
  standups: PropTypes.array.isRequired,
  updateStandupSelected: PropTypes.func.isRequired,
}

export default StandupSummary;
