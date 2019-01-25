import * as React from 'react';
import { Link } from "react-router-dom"

import "./NewsfeedStandup.css";

const StandupPending = ({ sortedStandups }) => {
  // Extract the most recent uncompleted standup regardless of its expiration
  const pendingStandup = sortedStandups.reduce( (standups, currentStandup) => {
    if (!currentStandup.submitted_at) {
      standups.push(currentStandup)
    }
    return standups;
  }, [])[0];
  const standupId = `${ new Date(pendingStandup.expiration).toLocaleDateString() } - ${ pendingStandup.member.username }`;
  return (
    <React.Fragment>
      <label className='team-standup-label'>
        Pending Standup
      </label>
      { !pendingStandup.submitted_at && pendingStandup.expiration > Date.now()
          ? <div>
              <Link className={`team-standup-id`}
                to={pendingStandup ? `/project/standup/${pendingStandup.id}` : "#"}
              >
                { pendingStandup 
                    ? standupId
                    : "No Standup Available" }
              </Link>
            </div>
          : <div className="team-standup-id">No pending standup</div>
      }
    </React.Fragment>
  );

}

export default StandupPending;
