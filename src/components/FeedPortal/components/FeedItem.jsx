import React, { Fragment } from "react"
import PropTypes from "prop-types"
import timeSince from "../../utilities/timeSince"
import "./FeedItem.css"

const FeedItemContainer = ({ component: Component, item }) => {
  const header = type => {
    switch (type) {
      case "NewsfeedVoyage":
        return [item.voyage.title]
      case "NewsfeedStandup":
        return [item.user.username, item.user.avatar];
      case "GithubActivityIssue":
        return [item.repo.repo_name, item.repo.issue.user.avatar];
      case "GithubActivityPullRequest":
        return [item.repo.repo_name, item.repo.pull_requests.user.avatar]
      default:
        return "Chingu"
    }
  }
  const [title, avatar] = header(item.type)
  return (
    <Fragment>
      <div className="feed-item__container">
        <div className="feed-item__header-content">
          <div className="feed-item__header--left">
            <div>{title}</div>
            {avatar && <img alt="update-user-avatar" src={avatar}
              className="feed-item__header-avatar" />}
          </div>
          <div className="feed-item__header--right">{timeSince(item.timestamp) + " ago"} </div>
        </div>
      </div>
      <Component {...item} />
    </Fragment>
  )
}

FeedItemContainer.propTypes = {
  component: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default FeedItemContainer