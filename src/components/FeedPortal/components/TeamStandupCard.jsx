import * as React from 'react';
import './TeamStandupCard.css';

const TeamStandupComponent = ({ standup }) => {
  let healthStatus;
  switch (standup.progress_sentiment) {
    case 'red':
      healthStatus = 'Trouble Ahead!';
      break;
    case 'yellow':
      healthStatus = 'Nervous';
      break;
    case 'green':
      healthStatus = 'Great!';
      break;
    default:
      healthStatus = 'No Response Yet';
      break;
  }
  let standupObjects = [
    { label: 'health status', data: healthStatus },
    { label: 'worked on', data: standup.worked_on },
    { label: 'working on next', data: standup.working_on },
    { label: 'blockers', data: standup.blocked_on }
  ]

  let renderedStandup = standupObjects.map((object, idx) => {
    let className = object.label === 'health status' ? "team-standup-answer team-standup-status--" + standup.progress_sentiment : "team-standup-answer";
    return (
      <div key={"team-standup_" + idx} className="team-standup-data">
        <div className="team-standup-label">{object.label} :</div>
        <div className={className}>{object.data}</div>
      </div>

    )
  })

  return (
    <div className="team-standup-card-container">
      {renderedStandup}
    </div>
  )
}

export default TeamStandupComponent;