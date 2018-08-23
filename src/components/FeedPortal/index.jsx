import React, { Fragment } from "react"
import "./FeedPortal.css"

const SidebarBtn = ({ lbl, active }) => (
  <Fragment>
    <hr className="hl" />
    <div
      className={`sidebar-nav__btn ${active ? "active" : null}`}>
      {lbl}</div>
  </Fragment>
)

class FeedPortal extends React.Component {
  render() {
    return (
      <div className="view-container">
        <div className="portal-container">

          <aside className="sidebar-container">
            <div className="portal-panel__sidebar">
              <div className="sidebar-userinfo__container">
                <img
                  className="sidebar-userinfo__avatar"
                  src={" http://placehold.it/150x150"}
                  alt="User Avatar" />
                <div
                  className="sidebar-userinfo__username">
                  test</div>
              </div>

              <SidebarBtn lbl="All News" />

              <hr className="hl" />
              <labelv className="sidebar-nav__label">Your Teams</labelv>
              <SidebarBtn lbl="Voyage-4/Bears-Team-11" active />
              <SidebarBtn lbl="Voyage-2/Turtles-Team-11" />
              <hr className="hl" />
            </div>
          </aside>

          <main className="main-container">
            <div className="title">NEWS FEED</div>
            <main className="portal-panel__feed">
              Feed
            <hr className="hl" />
            </main>
          </main>
        </div>
      </div>
    )
  }
}

export default FeedPortal