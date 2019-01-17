import React from 'react';
import PropTypes from 'prop-types';

import "./NewsfeedStandup.css";
import FeedItemContainer from "./FeedItem";
import StandupDetail from "./StandupDetail";
import StandupSummary from "./StandupSummary";

class NewsfeedStandup extends React.Component {

  static propTypes = {
    standup: PropTypes.object.isRequired,
    timestamp: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const { standup } = props;
    this.state = {
      standup: standup,
    };
    console.log('standup:', this.state);
  }
  
  renderResponses() {
    console.log('NewsfeedStandup - renderResponses - this.state: ', this.state);
    return (
      <React.Fragment>
        <div className="team-standup-container">
          <div className="team-standup-summary">
            <StandupSummary/>
          </div>
          <div className="team-standup-detail">
            <StandupDetail { ...this.state }/>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        { this.renderResponses() }
      </React.Fragment>
    );
  }

}

export default NewsfeedStandup;
