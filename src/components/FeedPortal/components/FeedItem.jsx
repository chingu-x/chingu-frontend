import React, { Fragment } from "react"
import PropTypes from "prop-types"
import "./FeedItem.css"
import newsfeedDateFormatter from '../../utilities/newsfeedDateFormatter';

const header = ({ type, user, repo })=> {
  switch (type) {
    case "NewsfeedVoyage":
      return ["Chingu"]
    case "NewsfeedStandup":
      return [user.username, user.avatar];
    case "GithubActivityIssue":
      return [repo.repo_name, user.avatar];
    case "GithubActivityPullRequest":
      return [repo.repo_name, user.avatar]
    default:
      return ["Chingu"]
  }
}

const FeedItemContainer = ({ component: Component, item, key }) => {
  const [title, avatar] = header(item);
  return (
    <div key={key} className="feed-item-component-container">
      <div className="feed-item__container">
        <div className="feed-item__header-content">
          <div className="feed-item__header--left">
            {avatar && <img alt="update-user-avatar" src={avatar}
              className="feed-item__header-avatar" />}
            <div>{title}</div>
          </div>
          <div className="feed-item__header--right">
            {newsfeedDateFormatter(item.timestamp) + " ago"}
          </div>
        </div>
      </div>
      <Component {...item} />
    </div>
  )
}

FeedItemContainer.propTypes = {
  component: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default FeedItemContainer