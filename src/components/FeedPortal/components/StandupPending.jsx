import * as React from 'react';

import "./NewsfeedStandup.css";

const StandupPending = ({ sortedStandups }) => {
  // Extract the most recent uncompleted standup regardless of its expiration
  const pendingStandup = sortedStandups.reduce( (standups, currentStandup) => {
    if (!currentStandup.submitted_at) {
      standups.push(currentStandup)
    }
    return standups;
  }, [])[0];
  
  return (
    <React.Fragment>
      <label className='team-standup-label'>
        Pending Standup
      </label>
      { !pendingStandup.submitted_at && pendingStandup.expiration > Date.now()
          ? <a href='#' className="team-standup-id" key={pendingStandup.submitted_at}
              onClick={ (e) => {
                // TODO: Add display of pending standup dialog
              } }>
              { new Date(pendingStandup.expiration).toLocaleDateString() }
            </a>
          : <div className="team-standup-id">No pending standup</div>
      }
    </React.Fragment>
  );

}

export default StandupPending;
