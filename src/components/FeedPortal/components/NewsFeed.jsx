import * as React from "react"
import NewsfeedItems from './index';
import FeedItemContainer from './FeedItem';
import newsFeedData from './newsfeedData.mock';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chinguItems: [],
      teamActivity: [],
      teamCardData: {}
    }
  }
  renderNewsfeedItems = () => {
    return newsFeedData.newsfeed.items.map((item) => {
      return FeedItemContainer({ component: NewsfeedItems[item.type], item: item });
    });
  }
  render() {
    return (
      <main className="main-container">
        <div className="title">NEWS FEED</div>
        <main className="portal-panel__feed">
          Feed
          <hr className="hl" />
          {this.renderNewsfeedItems()}
        </main>
      </main>
    )
  }
}

export default NewsFeed;
// export default props =>
//   <Request
//     component={NewsFeed}
//     query={sidebarQuery}
//     globalLoader
//     {...props} />

