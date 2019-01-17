import * as React from 'react';
import "./NewsfeedStandup.css";
import FeedItemContainer from "./FeedItem";
import StandupDetail from "./StandupDetail";
import StandupSummary from "./StandupSummary";

class NewsfeedStandup extends React.Component {

  state = {
    standup_selected: {},
  };

  componentDidMount() {
    const { standup } = this.props;
    this.setState(standup);
  }
  
  renderResponses = (standup) => {
    return (
      <React.Fragment>
        <div className="team-standup-container">
          <div className="team-standup-summary">
            <StandupSummary/>
          </div>
          <div className="team-standup-detail">
            <StandupDetail {...standup}/>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const standup = {...this.props.standup};
    return (
      <React.Fragment>
        { this.renderResponses({ standup }) }
      </React.Fragment>
    );
  }

}

export default NewsfeedStandup;
