import * as React from 'react';
import PropTypes from 'prop-types';

import "./NewsfeedStandup.css";

class StandupList extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    standups: PropTypes.array.isRequired,
    newStandupSelected: PropTypes.func.isRequired,
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
      case 'completed':
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

  formatTitle = (type) => {
    switch (type) {
      case 'completed':
        return 'Completed Standups';
      case 'most_recent':
        return 'Most Recent Standup';
      case 'pending':
        return 'Pending Standup';
      default:
        throw new Error(`Invalid standup type argument - type: ${type}`);
    }
  }
  
  renderStandups = (type, sortedStandups, newStandupSelected, updateSelectedStandup) => {
    let displayCount = 1;
    const incrementDisplayCount = () => {
      displayCount += 1;
    };
    // TODO: Add 'More...' option to multientry lists
    // TODO: Add function to determine if element is to be displayed based on its type. Replace ternary below
    return (
      <div>
        <label className="team-standup-label team-standup-label--padtop">{ this.formatTitle(type) }</label>
        { sortedStandups.length > 0
            ? sortedStandups.map( (standup, standupIndex) => (
                standupIndex !== 0 && standup.submitted_at && 
                displayCount < 4
                  ? <a href='#' className="team-standup-id" key={standup.submitted_at}
                      onClick={ (e) => {
                        newStandupSelected(e, standup, updateSelectedStandup);
                      } }>
                      { this.formatStandupId(type, standup) }
                      { incrementDisplayCount() }
                    </a>
                  : null
              ))
            : <div className="team-standup-id">
                No standups
              </div>
        }
      </div>
    );
  };

  render = () => {
    console.log('this.props.standups: ', this.props.standups);
    return (
      <React.Fragment>
        { this.renderStandups(this.props.type, this.props.standups,
            this.props.newStandupSelected,
            this.props.updateSelectedStandup) }
      </React.Fragment>
    );
  };

}

export default StandupList;
