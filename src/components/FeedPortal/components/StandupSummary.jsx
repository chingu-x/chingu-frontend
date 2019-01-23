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

  formatStandupId = (type, standup) => {
    let standupDate = null;
    switch (type) {
      case 'most_recent':
      case 'submitted':
        standupDate = new Date(standup.submitted_at).toLocaleDateString();
        break;
      case 'pending':
        standupDate = new Date(standup.expiration).toLocaleDateString();
        break;
      default:
        throw new Error(`Invalid standup type argument - type: ${type}`);
    }
    return `${standupDate} - ${standup.member.username}`;
  };

  // Update the selected standup in the containers state to force its display
  // in the detail component
  newStandupSelected = (e, mostRecentStandup, updateSelectedStandup) => {
    updateSelectedStandup(mostRecentStandup);
  }

  // Render the most recent pending standup. It is expected that this is the 
  // first cell where `submitted_at` is null.
  pendingStandup = (sortedStandups,updateSelectedStandup) => {
    const pendingStandup = sortedStandups
    .reduce( (standups, currentStandup) => {
      if (!currentStandup.submitted_at) {
        standups.push(currentStandup)
      }
      return standups;
    }, [])[0];

    return (
      <div>
        <label className="team-standup-label">Pending Standup</label>
        { 
          pendingStandup 
            ? <a href='#' className="team-standup-id" key={pendingStandup.expiration}
                onClick={ (e) => {
                  this.newStandupSelected(e, pendingStandup, updateSelectedStandup);
                } }>
                { this.formatStandupId('pending', pendingStandup) }
              </a>
            : <div className="team-standup-id">
                No uncompleted standups!
              </div>
        }
      </div>
    );
  };

  // Render the most recently completed standup. It is expected that the first
  // cell will contain the most recently scheduled standup.
  mostRecentStandup = (sortedStandups, updateSelectedStandup) => {
    const mostRecentStandup = sortedStandups[0];
    return (
      <div>
        <label className="team-standup-label  team-standup-label--padtop"> Most Recent Standup</label>
        {
          mostRecentStandup && mostRecentStandup.submitted_at
            ? <a href='#' className="team-standup-id" onClick={ (e) => {
                this.newStandupSelected(e, mostRecentStandup, updateSelectedStandup);
              } }>
              { this.formatStandupId('most_recent', mostRecentStandup) }
              </a>
            : <div className="team-standup-id">
                No standups completed yet
              </div>
        }
      </div>
    );
  };
  
  completedStandups = (sortedStandups, updateSelectedStandup) => {
    let displayCount = 1;
    const incrementDisplayCount = () => {
      displayCount += 1;
    };
    return (
      <div>
        <label className="team-standup-label team-standup-label--padtop">Completed Standups</label>
        { sortedStandups.length > 0
            ? sortedStandups.map( (standup, standupIndex) => (
                standupIndex !== 0 && standup.submitted_at && 
                standup.submitted_at !== this.mostRecentStandup.submitted_at &&
                displayCount < 4
                  ? <a href='#' className="team-standup-id" key={standup.submitted_at}
                      onClick={ (e) => {
                        this.newStandupSelected(e, standup, updateSelectedStandup);
                      } }>
                      { this.formatStandupId('submitted', standup) }
                      { incrementDisplayCount() }
                    </a>
                  : null
              ))
            : <div className="team-standup-id">
                No standups completed yet
              </div>
        }
      </div>
    );
  };

  renderResponses = (props) => {
    let sortedStandups = props.standups
    .slice() // Copy the array of standups so we don't modify props
    .sort( (a, b) => (b.submitted_at - a.submitted_at) );
    // TODO: Refactor to use StandupList component for all types of standups
    return (
      <React.Fragment>
        { this.pendingStandup(sortedStandups, props.updateSelectedStandup) }
        { this.mostRecentStandup(sortedStandups, props.updateSelectedStandup) }
        <StandupList title="Completed Standups" standups={ props.standups }
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
