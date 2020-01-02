import * as React from 'react';
import PropTypes from 'prop-types';

import "./NewsfeedStandup.css";

const INITIAL_LIST_LIMIT = 3;

class StandupCompleted extends React.Component {

  static propTypes = {
    sortedStandups: PropTypes.array.isRequired,
    newStandupSelected: PropTypes.func.isRequired,
    updateSelectedStandup: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.defaultDisplayListCount = INITIAL_LIST_LIMIT;
    this.state = {
      listDisplayLimit: this.defaultDisplayListCount,
      scrollText: "More..."
    };
  }

  filterStandups = (standup, standupIndex, displayCount) => {
    return standupIndex !== 0 && standup.submitted_at && displayCount <= this.state.listDisplayLimit;
  }

  renderMore = (sortedStandups) => {
    const completedStandupCount = sortedStandups.reduce((count, standup, standupIndex) => {
      if (this.filterStandups(standup, standupIndex, 0)) {
        count += 1;
      }
      return count;
    }, 0);

    return (
      <div>
        { completedStandupCount > INITIAL_LIST_LIMIT
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

  render = () => {
    const { sortedStandups, newStandupSelected, updateSelectedStandup } = this.props;
    let displayCount = 1;
    const incrementDisplayCount = () => {
      displayCount += 1;
    };
    
    return (
      <React.Fragment>
        <label className='team-standup-label team-standup-label--padtop'>
          Completed Standups
        </label>
        { sortedStandups.length > 0
            ? sortedStandups.map( (standup, standupIndex) => (
                this.filterStandups(standup, standupIndex, displayCount)
                  ? <a href='#' className="team-standup-id" key={standup.submitted_at}
                      onClick={ (e) => {
                        newStandupSelected(e, standup, updateSelectedStandup);
                      } }>
                      { new Date(standup.submitted_at).toLocaleDateString()} - { standup.member.username }
                      { incrementDisplayCount() }
                    </a>
                  : null
              ))
            : <div className="team-standup-id">No standups</div>
        }
        { this.renderMore(sortedStandups) }
      </React.Fragment>
    );
  };

}

export default StandupCompleted;
