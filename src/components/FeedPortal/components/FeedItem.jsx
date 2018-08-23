import React from "react"
import "./FeedItem.css"

const FeedItemContainer = ({ item: Item }) => {
  const content = {
    time: "39 mins ago",
    img: require("../../../assets/team-icon.png"),
    title: "titlehere",
    team: "powerrangers"
  }
  return (
    <div className="feed-item__container">
      Feed goes here


    </div>
  )
}

export default FeedItemContainer