import * as React from 'react';
import PropTypes from 'prop-types';

import "./NewsfeedStandup.css";

class StandupList extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
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
  
  renderStandups = (title, sortedStandups, newStandupSelected, updateSelectedStandup) => {
    let displayCount = 1;
    const incrementDisplayCount = () => {
      displayCount += 1;
    };
    // TODO: Add 'More...' option to multientry lists
    return (
      <div>
        <label className="team-standup-label team-standup-label--padtop">{ title }</label>
        { sortedStandups.length > 0
            ? sortedStandups.map( (standup, standupIndex) => (
                standupIndex !== 0 && standup.submitted_at && 
                displayCount < 4
                  ? <a href='#' className="team-standup-id" key={standup.submitted_at}
                      onClick={ (e) => {
                        newStandupSelected(e, standup, updateSelectedStandup);
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

  render = () => {
    let sortedStandups = this.props.standups
    .slice() // Copy the array of standups so we don't modify props
    .sort( (a, b) => (b.submitted_at - a.submitted_at) );
    return (
      <React.Fragment>
        { this.renderStandups(this.props.title, sortedStandups,
            this.props.newStandupSelected,
            this.props.updateSelectedStandup) }
      </React.Fragment>
    );
  };

}

export default StandupList;
