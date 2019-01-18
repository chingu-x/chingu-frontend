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

const formatStandupId = (type, standup) => {
  let standupDate = null;
  switch (type) {
    case 'most_recent':
    case 'submitted':
      standupDate = new Date(standup.submitted_at).toLocaleDateString();
      break;
    case 'pending':
      standupDate = new Date(standup.expiration).toLocaleDateString();
      break;
    default:
      throw new Error(`Invalid standup type argument - type: ${type}`);
  }
  return `${standupDate} - ${standup.member.username}`;
};

// Update the selected standup in the containers state to force its display
// in the detail component
const newStandupSelected = (e, mostRecentStandup, updateSelectedStandup) => {
  updateSelectedStandup(mostRecentStandup);
};

const renderResponses = (props) => {
  console.log('StandupSummary - renderResponses - props: ', props);
  const mostRecentStandup = props.standups[props.standups.length-1];
  return (
    <React.Fragment>
      <label className="team-standup-label">Recent Standups</label>
      <a href='#' className="team-standup-id" 
        onClick={ (e) => {
          newStandupSelected(e, mostRecentStandup, props.updateSelectedStandup);
         } }>
        { formatStandupId('most_recent', mostRecentStandup) }
      </a>
      <label className="team-standup-label team-standup-label--padtop">All Standups</label>
      { props.standups.map( standup => (
          standup.submitted_at && standup.submitted_at !== mostRecentStandup.submitted_at
            ? <a href='#' className="team-standup-id" key={standup.submitted_at}
                onClick={ (e) => {
                newStandupSelected(e, standup, props.updateSelectedStandup);
              } }>
              { formatStandupId('submitted', standup) }
              </a>
            : null
        ),
      )}
      <label className="team-standup-label team-standup-label--padtop">Pending Standups</label>
      { props.standups.map( standup => (
          !standup.submitted_at
            ? <a href='#' className="team-standup-id" key={standup.expiration}
                onClick={ (e) => {
                newStandupSelected(e, standup, props.updateSelectedStandup);
              } }>
              { formatStandupId('pending', standup) }
              </a>
            : null
        ),
      )}
      <label className="team-standup-label team-standup-label--padtop">Missed Standups:
        &nbsp;
        { props.standups.reduce( (accumulator, standup) => {
            return accumulator = standup.is_expired ? accumulator + 1 : accumulator;
          }, 0)
        }
      </label>
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
  updateSelectedStandup: PropTypes.func.isRequired,
}

export default StandupSummary;
