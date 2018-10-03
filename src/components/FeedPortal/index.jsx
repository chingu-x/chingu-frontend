import React from "react"
import "./FeedPortal.css"
import SideBar from './components/SideBar';
import NewsFeed from './components/NewsFeed';

class FeedPortal extends React.Component {
  state = {
    newsfeed: {
      type: "ALL",
      team_id: null
    }
  }

  toggleNewsfeed = (type, team_id) => this.setState({ newsfeed: { type, team_id } })

  render() {
    const { type, team_id } = this.state.newsfeed
    return (
      <div className="view-container">
        <div className="portal-container">
          <SideBar toggleNewsfeed={this.toggleNewsfeed} team_id={team_id} />
          <NewsFeed type={type} team_id={team_id} />
        </div>
      </div>
    )
  }
}

export default FeedPortal

