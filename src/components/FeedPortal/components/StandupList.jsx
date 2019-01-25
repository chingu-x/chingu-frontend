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
    this.defaultDisplayListCount = 2;
    this.state = {
      listDisplayLimit: this.defaultDisplayListCount,
      scrollText: "More..."
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

  /**
   * Based on its type, determine if the current standup should be displayed
   * @param {String} type Identifies the standup as 'completed', 'most_recent',
   * or 'pending'
   * @param {Object} standup Standup object instance
   * @param {Number} standupIndex Standup's position in the list
   * @param {Number} displayCount Number of entries currently included in the list
   * @returns {Boolean} true if standup is to be display, otherwise false.
   */
  filterStandups = (type, standup, standupIndex, displayCount) => {
    switch (type) {
      case 'completed':
        return standupIndex !== 0 && standup.submitted_at && displayCount <= this.state.listDisplayLimit;
      case 'most_recent':
        return standup.submitted_at;
      case 'pending':
        return !standup.submitted_at && standup.expiration > Date.now();
      default:
        throw new Error(`Invalid standup type argument - type: ${type}`);
    }
  }

  renderMore = (type, sortedStandups) => {
    const completedStandupCount = sortedStandups.reduce((count, standup, standupIndex) => {
      if (this.filterStandups('completed', standup, standupIndex, 0)) {
        count += 1;
      }
      return count;
    }, 0);

    return (
      <div>
        { type === 'completed' && completedStandupCount > 3
            ? <a id="team-standup-scroll" href='#' className="team-standup-id"
                onClick={ (e) => {
                  if (this.state.scrollText === 'More...') {
                    this.setState({ 
                      listDisplayLimit: completedStandupCount,
                      scrollText: 'Less...'
                    });
                  } else {
                    this.setState({ 
                      listDisplayLimit: this.defaultDisplayListCount,
                      scrollText: 'More...'
                    });
                  }
                } }>
                { this.state.scrollText }
              </a>
            : null
        }
      </div>
    );
  }
  
  renderList = (type, sortedStandups, newStandupSelected, updateSelectedStandup) => {
    let displayCount = 0;
    const incrementDisplayCount = () => {
      displayCount += 1;
    };
    const standupClassName = type === 'pending' 
      ? 'team-standup-label'
      : ' team-standup-label team-standup-label--padtop';

    return (
      <div>
        <label className={standupClassName}>{ this.formatTitle(type) }</label>
        { sortedStandups.length > 0
            ? sortedStandups.map( (standup, standupIndex) => (
                this.filterStandups(type, standup, standupIndex, displayCount)
                  ? <a href='#' className="team-standup-id" key={standup.submitted_at}
                      onClick={ (e) => {
                        newStandupSelected(e, standup, updateSelectedStandup);
                      } }>
                      { this.formatStandupId(type, standup) }
                      { incrementDisplayCount() }
                    </a>
                  : type !== 'completed' 
                      ? <div className="team-standup-id" key="nostandup">No Standups</div>
                      : null
              ))
            : <div className="team-standup-id">No standups</div>
        }
        { this.renderMore(type, sortedStandups) }
      </div>
    );
  };

  render = () => {
    return (
      <React.Fragment>
        { this.renderList(this.props.type, this.props.standups,
            this.props.newStandupSelected,
            this.props.updateSelectedStandup) }
      </React.Fragment>
    );
  };

}

export default StandupList;
