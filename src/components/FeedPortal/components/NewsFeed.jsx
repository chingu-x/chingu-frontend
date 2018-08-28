import * as React from "react"
import PropTypes from "prop-types"
import Request from "../../utilities/Request"
import Loader from "../../Loader"
import NewsfeedItems from './index';
import FeedItemContainer from './FeedItem';
import TeamCard from './TeamCard';
import newsfeedQuery from "../graphql/newsfeedQuery"
import NoNews from './NoNews';

const NewsFeed = ({ type, loading, data }) => {
  const getTitle = (team) => `
    ${team ? `${team.title.toUpperCase()}` : "ALL"} NEWS
  `;

  const renderNewsfeedItems = items => items.map(
    item => FeedItemContainer({
      component: NewsfeedItems[item.type],
      item,
      key: item.id,
    }),
  );

  const renderFeed = ({ newsfeed: { chingu, other, team } }) => {
    let dataToRender = (
      <React.Fragment>
        {
          type === "TEAM"
            ? <TeamCard team={team} />
            : renderNewsfeedItems(chingu)
        }
        {(team || !!chingu.length) && other && <hr className="hl" />}
        {renderNewsfeedItems(other)}
      </React.Fragment>
    );
    return ((!other.length && !chingu.length) ? <NoNews /> : dataToRender);
  }

  return (
    <div className="main-container">
      <div className="title">
        {data.newsfeed && getTitle(data.newsfeed.team)}
      </div>
      <div className="portal-panel__feed">
        {
          loading
            ? <Loader height="600px" size="medium" />
            : renderFeed(data)
        }
      </div>
    </div >
  )
}

NewsFeed.propTypes = {
  type: PropTypes.oneOf(["ALL", "TEAM"]).isRequired,
  data: PropTypes.shape({
    newsfeed: PropTypes.object
  })
}

NewsFeed.defaultProps = {
  type: "ALL",
}

export default (props) => {
  const variables = {
    input: {
      type: props.type,
      team_id: props.team_id,
      limit: 12,
    }
  }
  return (
    <Request
      {...props}
      component={NewsFeed}
      query={newsfeedQuery}
      variables={variables}
      options={{ pollInterval: 5 * 60 * 1000 }}
    />
  )
}
