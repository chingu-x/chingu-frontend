import React from "react"
import "./FeedPortal.css"
import SideBar from './components/SideBar';
import NewsFeed from './components/NewsFeed';

class FeedPortal extends React.Component {
  state = {
    newsfeed: {
      type: "ALL",
      project_id: null
    }
  }

  toggleNewsfeed = (type, project_id) => this.setState({ newsfeed: { type, project_id } })

  render() {
    const { type, project_id } = this.state.newsfeed
    return (
      <div className="view-container">
        <div className="portal-container">
          <SideBar toggleNewsfeed={this.toggleNewsfeed} project_id={project_id} />
          <NewsFeed type={type} project_id={project_id} />
        </div>
      </div>
    )
  }
}

export default FeedPortal

