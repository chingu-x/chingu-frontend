import React, { Fragment } from "react"
import PropTypes from "prop-types"
import timeSince from "../../utilities/timeSince"
import "./FeedItem.css"

const FeedItemContainer = ({
  component: Component,
  feed,
  timestamp,
  title,
  avatar,
  ...props
}) => {
  return (
    <Fragment>
      <div className="feed-item__container">
        <div className="feed-item__header-content">
          <div className="feed-item__header--left">
            <div>{title}</div>
            <img alt="update-user-avatar" src={avatar}
              className="feed-item__header-avatar" />
          </div>
          <div className="feed-item__header--right">{timeSince(timestamp) + " ago"} </div>
        </div>
      </div>
      <Component {...feed} {...props} />
    </Fragment>
  )
}

FeedItemContainer.propTypes = {
  component: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string,
}

// TODO: Cleanup default props
FeedItemContainer.defaultProps = {
  component: () => <div style={{ width: "100%", minHeight: "150px", backgroundColor: "#F8F8F8" }} />,
  feed: {},
  timestamp: 1535090610661,
  title: "Halloween Voyage/the-vampiire",
  avatar: "https://avatars3.githubusercontent.com/u/25523682?v=4"
}

export default FeedItemContainer