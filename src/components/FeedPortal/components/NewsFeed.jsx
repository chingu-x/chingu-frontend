import * as React from "react"
import PropTypes from "prop-types"
import Request from "../../utilities/Request"
import Loader from "../../Loader"
import NewsfeedItems from './index';
import FeedItemContainer from './FeedItem';
import TeamCard from './TeamCard';
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

  renderNewsfeedItems = items => items.map(
    item => FeedItemContainer({
      component: NewsfeedItems[item.type],
      item,
      key: item.id,
    }),
  );
  

  renderFeed = ({ newsfeed: { chingu, other } }) => {
    const { renderTeamCard } = this.state;
    const { team_id } = this.props;
    return (
      <React.Fragment>
        {
          renderTeamCard
            ? <TeamCard team_id={team_id} />
            : this.renderNewsfeedItems(chingu)
        }
        <hr className="hl" />
        {this.renderNewsfeedItems(other)}
      </React.Fragment>
    );
  }

  render() {
    const { loading, data } = this.props
    return (
      <main className="main-container">
        <div className="title">NEWS FEED</div>
        <main className="portal-panel__feed">
          {
            loading
              ? <div style={{ height: "600px" }}><Loader style="medium" /></div>
              : this.renderFeed(data)
          }
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
