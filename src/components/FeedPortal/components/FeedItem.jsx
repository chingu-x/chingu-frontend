import React, { Fragment } from "react"
import PropTypes from "prop-types"
import timeSince from "../../utilities/timeSince"
import "./FeedItem.css"
import newsfeedDateFormatter from '../../utilities/newsfeedDateFormatter';

const FeedItemContainer = ({ component: Component, item }) => {
  const header = type => {
    switch (type) {
      case "NewsfeedVoyage":
        return ["Chingu"]
      case "NewsfeedStandup":
        return [item.user.username, item.user.avatar];
      case "GithubActivityIssue":
        return [item.repo.repo_name, item.user.avatar];
      case "GithubActivityPullRequest":
        return [item.repo.repo_name, item.user.avatar]
      default:
        return ["Chingu"]
    }
  }
  const [title, avatar] = header(item.type)
  return (
    <div className="feed-item-component-container">
      <div className="feed-item__container">
        <div className="feed-item__header-content">
          <div className="feed-item__header--left">
            {avatar && <img alt="update-user-avatar" src={avatar}
              className="feed-item__header-avatar" />}
            <div>{title}</div>
          </div>
          <div className="feed-item__header--right">{newsfeedDateFormatter(item.timestamp) + " ago"} </div>
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