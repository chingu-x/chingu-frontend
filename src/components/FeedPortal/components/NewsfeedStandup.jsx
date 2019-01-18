import React from 'react';
import PropTypes from 'prop-types';

import "./NewsfeedStandup.css";
import FeedItemContainer from "./FeedItem";
import StandupDetail from "./StandupDetail";
import StandupSummary from "./StandupSummary";

class NewsfeedStandup extends React.Component {

  static propTypes = {
    standups: PropTypes.array.isRequired,
    timestamp: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const { standups } = props;
    this.state = {
      standups: standups,
      selected_standup: { ...standups[standups.length-1] },
    };
  }

  updateSelectedStandup(standup) {
    this.setState({ selected_standup: { ...standup } });
  }
  
  renderResponses() {
    console.log('NewsfeedStandup - renderResponses - this.state: ', this.state);
    const standup = { standup: this.state.selected_standup };
    return (
      <React.Fragment>
        <div className="team-standup-container">
          <div className="team-standup-summary">
            <StandupSummary 
              standups={ this.state.standups }
              updateStandupSelected={ this.updateSelectedStandup }/>
          </div>
          <div className="team-standup-detail">
            <StandupDetail { ...standup }/>
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
