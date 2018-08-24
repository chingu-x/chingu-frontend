import * as React from 'react';
import './TeamStandupCard.css';

const TeamStandupComponent = ({ userStandup }) => {
  let standup = userStandup.standup;
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
    { label: 'Health Status:', data: healthStatus },
    { label: 'Worked on:', data: standup.worked_on },
    { label: 'Working on next:', data: standup.working_on },
    { label: 'Blockers:', data: standup.blocked_on }
  ]

  let renderedStandup = standupObjects.map((standup, idx) => {
    let className = "team-standup-answer"
    if (standup.label === 'Health Status:') {
      className = "team-standup-answer team-standup-status--" + userStandup.standup.progress_sentiment;
    }
    return (
      <div key={"team-standup_" + idx} className="team-standup-data">
        <div className="team-standup-label">{standup.label}</div>
        <div className={className}>{standup.data}</div>
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