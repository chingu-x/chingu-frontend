import React, { Component, Fragment } from "react"
import "./FeedPortal.css"
import SideBar from './components/SideBar';
import NewsFeed from './components/NewsFeed';

class FeedPortal extends Component {
  state = {
    newsfeed: {
      type: "ALL",
      team_id: null
    }
  }

  toggleNewsFeed = (type, team_id) => this.setState({ type, team_id })

  render() {
    return (
      <div className="view-container">
        <div className="portal-container">
          <SideBar toggleNewsFeed={this.toggleNewsFeed} />
          <NewsFeed variables={this.state.newsfeed} />
        </div>
      </div>
    )
  }
}

export default FeedPortal