import * as React from "react"
import PropTypes from "prop-types"
import Request from "../../utilities/Request"
import Loader from "../../Loader"
import NewsfeedItems from './index';
import FeedItemContainer from './FeedItem';
import TeamCard from './TeamCard';
import newsFeedData from './newsfeedData.mock';
import newsfeedQuery from "../graphql/newsfeedQuery"

class NewsFeed extends React.Component {
  state = {
    chinguItems: [],
    teamItems: [],
    renderTeamCard: false
  }

  static propTypes = {
    type: PropTypes.oneOf(["ALL", "TEAM"]).isRequired,
    team_id: PropTypes.number,
    data: PropTypes.shape({
      newsfeed: PropTypes.object
    })
  }

  static defaultProps = {
    type: "ALL",
    team_id: null
  }

  static getDerivedStateFromProps(props) {
    const teamItems = [];
    const chinguItems = [];
    // filter data per team vs chingu related news
    newsFeedData.newsfeed.items.map((item) => {
      switch (item.type) {
        case 'NewsfeedVoyage':
          chinguItems.push(item);
          break;
        default:
          teamItems.push(item);
          break;
      }
    });
    return props.type === 'ALL'
      ? { chinguItems, teamItems, renderTeamCard: false }
      : { teamItems, renderTeamCard: true }
  }

  renderNewsfeedItems = (array) => {
    return array.map((item) => {
      return FeedItemContainer({ component: NewsfeedItems[item.type], item, key: item.id });
    });
  }

  render() {
    const { loading } = this.props
    return (
      <main className="main-container">
        <div className="title">NEWS FEED</div>
        <main className="portal-panel__feed">
          {loading && <div style={{ height: "600px" }}><Loader style="medium" /></div>}
          {!loading && (this.state.renderTeamCard ? <TeamCard team_id={this.props.team_id} /> : this.renderNewsfeedItems(this.state.chinguItems))}
          <hr className="hl" />
          {!loading && this.renderNewsfeedItems(this.state.teamItems)}
        </main>
      </main >
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
