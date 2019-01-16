import * as React from 'react';
import "./NewsfeedStandup.css";
import FeedItemContainer from "./FeedItem";
import StandupDetail from "./StandupDetail";
import StandupSummary from "./StandupSummary";

const renderResponses = standups => {
  const standup = {standup: standups.standups[Object.values(standups.standups).length-1]};
  return (
    <React.Fragment>
      <div className="team-standup-summary">
        <StandupSummary/>
      </div>
      <div className="team-standup-detail">
        <StandupDetail {...standup}/>
      </div>
    </React.Fragment>
  );
};

const NewsfeedStandup = (standups) => (
  <div className="team-standup-container">
    {renderResponses({ standups })}
  </div>
);

export default NewsfeedStandup;
