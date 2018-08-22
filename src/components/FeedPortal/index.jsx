import React from "react"
import "./FeedPortal.css"

class FeedPortal extends React.Component {
  render() {
    return (
      <div className="view-container">

        <div className="portal-container">
          <aside className="portal-panel__sidebar">
            <div className="sidebar-userinfo__container">
              <img
                className="sidebar-userinfo__avatar"
                src={" http://placehold.it/150x150"}
                alt="User Avatar" />
              <div
                className="sidebar-userinfo__username">
                UsernameHere</div>
            </div>
            <hr className="hl" />
          </aside>
          <main className="portal-panel__feed">
            Feed
            <hr className="hl" />
          </main>
        </div>
      </div>
    )
  }
}

export default FeedPortal