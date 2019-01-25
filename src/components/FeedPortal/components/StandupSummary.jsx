import * as React from 'react';
import PropTypes from 'prop-types';

import "./NewsfeedStandup.css";
import StandupCompleted from './StandupCompleted';
import StandupPending from './StandupPending';
import StandupRecent from './StandupRecent';

class StandupSummary extends React.Component {

  static propTypes = {
    standups: PropTypes.array.isRequired,
    updateSelectedStandup: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      displayCount: 0,
    };

    // Force the most recently completed standup to be displayed in the detail panel
    this.sortedStandups = props.standups
    .slice() // Copy the array of standups so we don't modify props
    .sort( (a, b) => (b.submitted_at - a.submitted_at) );
    props.updateSelectedStandup(this.sortedStandups[0]);
  }

  // Update the selected standup in the containers state to force its display
  // in the detail component
  newStandupSelected = (e, mostRecentStandup, updateSelectedStandup) => {
    updateSelectedStandup(mostRecentStandup);
  }

  renderResponses = (props) => {
    return (
      <React.Fragment>
        <StandupPending sortedStandups={ this.sortedStandups } />
        <StandupRecent sortedStandups={ this.sortedStandups }
          newStandupSelected={ this.newStandupSelected }
          updateSelectedStandup={ props.updateSelectedStandup }/>
        <StandupCompleted sortedStandups={ this.sortedStandups }
          newStandupSelected={ this.newStandupSelected }
          updateSelectedStandup={ props.updateSelectedStandup }/>
      </React.Fragment>
    );
  };

  render = () => {
    return (
      <div className="team-standup-summary-data">
        { this.renderResponses(this.props) }
      </div>
    );
  };

}

export default StandupSummary;
