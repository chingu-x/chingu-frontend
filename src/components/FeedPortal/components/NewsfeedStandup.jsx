import * as React from 'react';
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

const renderResponses = standupFields => Object.keys(standupFields).map(
  standupField => {
    const fieldValue = standupFields[standupField];
    const className = classNameSelector(standupField, fieldValue);
    return (
      <div className="team-standup-data" key={standupField}>
        <label className="team-standup-label">{responseLabelMap[standupField]} :</label>
        <div className={className}>
          {
            standupField === "progress_sentiment"
              ? sentimentMap[fieldValue]
              : fieldValue
          }
        </div>
      </div>
    );
  },
);

const NewsfeedStandup = ({
  standup: {
    progress_sentiment,
    worked_on,
    working_on,
    blocked_on,
  },
}) => (
  <div className="team-standup-card-container">
      {renderResponses({ progress_sentiment, worked_on, working_on, blocked_on })}
  </div>
);

export default NewsfeedStandup;
