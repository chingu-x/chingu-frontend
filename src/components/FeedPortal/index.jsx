import React, { Fragment } from "react"
import "./FeedPortal.css"
import teamQuery from './graphql/teamQuery';
import Request from "../utilities/Request"
import SideBar from './components/SideBar';
import NewsFeed from './components/NewsFeed';

const FeedPortal = ({ data: { user } }) => {
  return (
    <div className="view-container">
      <div className="portal-container">
        <SideBar />
        <NewsFeed />
      </div>
    </div>
  )
}

export default props =>
  <Request
    component={FeedPortal}
    query={teamQuery}
    globalLoader
    {...props} />