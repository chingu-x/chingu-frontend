import * as React from "react"
import NewsfeedItems from './index';
import FeedItemContainer from './FeedItem';
import newsFeedData from './newsfeedData.mock';
import TeamCard from './TeamCard';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chinguItems: [],
      teamActivity: [],
      renderTeamCard: false
    }
  }
  componentDidMount() {
    let teamActivity = [];
    let chinguActivity = [];
    // filter data per team vs chingu related news
    newsFeedData.newsfeed.items.map((item) => {
      switch (item.type) {
        case 'NewsfeedVoyage':
          chinguActivity.push(item);
          break;
        default:
          teamActivity.push(item);
          break;
      }
    });
    this.props.type === 'ALL' 
      ? this.setState({ chinguItems: chinguActivity, teamActivity: teamActivity })
      : this.setState({ teamActivity: teamActivity, renderTeamCard: true  })
  }
  renderNewsfeedItems = (array) => {
    return array.map((item) => {
      return FeedItemContainer({ component: NewsfeedItems[item.type], item, key: item.id });
    });
  }
  render() {
    return (
      <main className="main-container">
        <div className="title">NEWS FEED</div>
        <main className="portal-panel__feed">
          {this.state.renderTeamCard ? <TeamCard team_id={this.props.team_id} /> : this.renderNewsfeedItems(this.state.chinguItems)}
          <hr className="hl" />
          {this.renderNewsfeedItems(this.state.teamActivity)}
        </main>
      </main>
    )
  }
}

const NewsFeedRequest = ({ variables }) =>
  <Request
    component={NewsFeed}
    query={newsfeedQuery}
    variables={{ input: { limit: 12, ...variables } }}
    {...variables} />

NewsFeedRequest.propTypes = {
  variables: PropTypes.shape({
    type: PropTypes.oneOf(["ALL", "TEAM"]),
    team_id: PropTypes.number
  })
}

NewsFeedRequest.defaultProps = {
  variables: { type: "ALL" }
}

export default NewsFeedRequest
