import React from "react"
import "./FeedPortal.css"

class FeedPortal extends React.Component {
  render() {
    return (
      <div className="view-container">

        <div className="portal-container">
          <div className="portal-panel__sidebar">sidebar</div>
          <div className="portal-panel__feed">feed</div>
        </div>
      </div>
    )
  }
}

export default FeedPortal