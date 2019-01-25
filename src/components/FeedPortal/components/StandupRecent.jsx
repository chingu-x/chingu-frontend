import * as React from 'react';

import "./NewsfeedStandup.css";

const StandupRecent = ({ sortedStandups, newStandupSelected, updateSelectedStandup }) => {
  const mostRecentStandup = sortedStandups[0];
  return (
    <React.Fragment>
      <label className='team-standup-label team-standup-label--padtop'>
        Most Recent Standup
      </label>
      { mostRecentStandup.submitted_at
          ? <button className="team-standup-id" key={ mostRecentStandup.submitted_at }
              onClick={ (e) => {
                newStandupSelected(e, mostRecentStandup, updateSelectedStandup);
              } }>
              { new Date(mostRecentStandup.submitted_at).toLocaleDateString() } - { mostRecentStandup.member.username }
            </button>
          : <div className="team-standup-id" key="norecent">No completed standups</div>
      }
    </React.Fragment>
  );
}

export default StandupRecent;
