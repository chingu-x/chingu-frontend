import * as React from 'react';
import PropTypes from 'prop-types';

import "./NewsfeedStandup.css";
import StandupList from './StandupList';

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
  }

  // Update the selected standup in the containers state to force its display
  // in the detail component
  newStandupSelected = (e, mostRecentStandup, updateSelectedStandup) => {
    updateSelectedStandup(mostRecentStandup);
  }

  renderResponses = (props) => {
    let sortedStandups = props.standups
    .slice() // Copy the array of standups so we don't modify props
    .sort( (a, b) => (b.submitted_at - a.submitted_at) );

    const pendingStandups = sortedStandups
    .reduce( (standups, currentStandup) => {
      if (!currentStandup.submitted_at) {
        standups.push(currentStandup)
      }
      return standups;
    }, []);

    // TODO: Refactor to use StandupList component for all types of standups
    return (
      <React.Fragment>
        <StandupList type="pending" 
          standups={ [pendingStandups[0]] }
          newStandupSelected={ this.newStandupSelected }
          updateSelectedStandup={ props.updateSelectedStandup }/>
        <StandupList type="most_recent" 
          standups={ [sortedStandups[0]] }
          newStandupSelected={ this.newStandupSelected }
          updateSelectedStandup={ props.updateSelectedStandup }/>
        <StandupList type="completed"
          standups={ props.standups }
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
