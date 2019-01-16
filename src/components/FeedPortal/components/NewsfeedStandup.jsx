import * as React from 'react';
import "./NewsfeedStandup.css";
import FeedItemContainer from "./FeedItem";
import StandupDetail from "./StandupDetail";
import StandupSummary from "./StandupSummary";

const renderResponses = standup => {
  console.log('NewsfeedStandup - standup: ', standup);
  return (
    <React.Fragment>
      <div className="team-standup-container">
        <div className="team-standup-summary">
          <StandupSummary/>
        </div>
        <div className="team-standup-detail">
          <StandupDetail {...standup.standup}/>
        </div>
      </div>
    </React.Fragment>
  );
};

const NewsfeedStandup = (standup) => (
  <React.Fragment>
    { renderResponses({ standup }) }
  </React.Fragment>
);

export default NewsfeedStandup;
