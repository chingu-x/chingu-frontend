import * as React from 'react';
import './TeamStandupCard.css';

const TeamStandupComponent = ({ userStandup }) => {
  let healthStatus;
  switch (userStandup.progress_sentiment) {
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
    { label: 'Worked on:', data: userStandup.worked_on },
    { label: 'Working on next:', data: userStandup.working_on },
    { label: 'Blockers:', data: userStandup.blocked_on }
  ]

  let standup = standupObjects.map((standup, idx) => {
    let className = "team-standup-answer"
    if (standup.label === 'Health Status:') {
      className = "team-standup-answer team-standup-status--" + userStandup.progress_sentiment;
    }
    return (
      <div className="team-standup-data">
        <div key={idx} className="team-standup-label">{standup.label}</div>
        <div key={idx} className={className}>{standup.data}</div>
      </div>

    )
  })

  return (
    <div className="team-standup-card-container">
      {standup}
    </div>
  )
}

export default TeamStandupComponent;