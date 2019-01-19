import * as React from 'react';
import PropTypes from 'prop-types';

import "./NewsfeedStandup.css";

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

// Render the most recent pending standup. It is expected that this is the 
// first cell where `submitted_at` is null.
const pendingStandup = (sortedStandups,updateSelectedStandup) => {
  const pendingStandup = sortedStandups
  .reduce( (standups, currentStandup) => {
    if (!currentStandup.submitted_at) {
      standups.push(currentStandup)
    }
    return standups;
  }, [])[0];

  return (
    <div>
      <label className="team-standup-label">Pending Standup</label>
      { 
        pendingStandup 
          ? <a href='#' className="team-standup-id" key={pendingStandup.expiration}
              onClick={ (e) => {
                newStandupSelected(e, pendingStandup, updateSelectedStandup);
              } }>
              { formatStandupId('pending', pendingStandup) }
            </a>
          : <div className="team-standup-id">
              No uncompleted standups!
            </div>
      }
    </div>
  );
}

// Render the most recently completed standup. It is expected that the first
// cell will contain the most recently scheduled standup.
const mostRecentStandup = (sortedStandups, updateSelectedStandup) => {
  const mostRecentStandup = sortedStandups[0];
  return (
    <div>
      <label className="team-standup-label  team-standup-label--padtop"> Most Recent Standup</label>
      {
        mostRecentStandup && mostRecentStandup.submitted_at
          ? <a href='#' className="team-standup-id" onClick={ (e) => {
              newStandupSelected(e, mostRecentStandup, updateSelectedStandup);
            } }>
            { formatStandupId('most_recent', mostRecentStandup) }
            </a>
          : <div className="team-standup-id">
              No standups completed yet
            </div>
      }
    </div>
  );
};

const completedStandups = (sortedStandups, updateSelectedStandup) => {
  return (
    <div>
      <label className="team-standup-label team-standup-label--padtop">Completed Standups</label>
      { sortedStandups.map( (standup, standupIndex) => (
          standupIndex !== 0 && standup.submitted_at && standup.submitted_at !== mostRecentStandup.submitted_at
            ? <a href='#' className="team-standup-id" key={standup.submitted_at}
                onClick={ (e) => {
                newStandupSelected(e, standup, updateSelectedStandup);
              } }>
              { formatStandupId('submitted', standup) }
              </a>
            : null
        ),
      )}
    </div>
  );
}

const renderResponses = (props) => {
  let sortedStandups = props.standups
  .slice() // Copy the array of standups so we don't modify props
  .sort( (a, b) => (b.submitted_at - a.submitted_at) );
  return (
    <React.Fragment>
      { pendingStandup(sortedStandups, props.updateSelectedStandup) }
      { mostRecentStandup(sortedStandups, props.updateSelectedStandup) }
      { completedStandups(sortedStandups, props.updateSelectedStandup) }
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
