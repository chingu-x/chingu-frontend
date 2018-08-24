import React, { Fragment } from "react"
import PropTypes from "prop-types"
import timeSince from "../../utilities/timeSince"
import "./FeedItem.css"

const result = {
  "data": {
    "newsfeed": {
      "id": "TVRGMmIzbGhaMlU9YWxs",
      "items": [
        {
          "id": "MTF2b3lhZ2U=",
          "type": "NewsfeedVoyage",
          "timestamp": 1535090610661,
          "user": {
            "id": "6",
            "username": "the-vampiire",
            "avatar": "https://avatars3.githubusercontent.com/u/25523682?v=4"
          },
          "voyage": {
            "id": "11",
            "title": "Halloween Voyage"
          }
        },
        {
          "id": "MXN0YW5kdXA=",
          "type": "NewsfeedStandup",
          "timestamp": 1535088249192,
          "user": {
            "id": "6",
            "username": "the-vampiire",
            "avatar": "https://avatars3.githubusercontent.com/u/25523682?v=4"
          },
          "standup": {
            "id": "1",
            "is_expired": false,
            "progress_sentiment": "green",
            "expiration": 1535692113990
          }
        }
      ]
    }
  }
}

const FeedItemContainer = ({
  component: Component,
  header,
  ...item
}) => {
  const {
    timestamp,
    type,
    user: {
      username,
      avatar
    },
    voyage: { title } } = header


  return (
    <Fragment>

      <div className="feed-item__container">
        <div className="feed-item__header-content">
          <div className="feed-item__header--left">
            <div>{`${title}/${username}`}</div>
            <img alt="update-user-avatar" src={avatar}
              className="feed-item__header-avatar" />
          </div>
          <div className="feed-item__header--right">{timeSince(timestamp) + " ago"} </div>
        </div>
      </div>
      <Component {...item} />
    </Fragment>
  )
}

FeedItemContainer.propTypes = {
  component: PropTypes.func.isRequired,
  item: PropTypes.object,
  header: PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }),
    voyage: PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  })
}

FeedItemContainer.defaultProps = {
  component: () => <div style={{ width: "100%", minHeight: "150px", backgroundColor: "#F8F8F8" }} />,
  item: {},
  header: {
    "id": "MTF2b3lhZ2U=",
    "type": "NewsfeedVoyage",
    "timestamp": 1535090610661,
    "user": {
      "id": "6",
      "username": "the-vampiire",
      "avatar": "https://avatars3.githubusercontent.com/u/25523682?v=4"
    },
    "voyage": {
      "id": "11",
      "title": "Halloween Voyage"
    }
  }
}

export default FeedItemContainer