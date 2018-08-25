import * as React from "react"
import NewsfeedItems from './index';
import FeedItemContainer from './FeedItem';

let newsFeedData = {
  "newsfeed": {
    "id": "TVRGMmIzbGhaMlU9YWxs",
    "items": [
      // {
      //   "id": "MTF2b3lhZ2U=",
      //   "type": "NewsfeedVoyage",
      //   "timestamp": 1535090610661,
      //   "user": {
      //     "id": "6",
      //     "username": "the-vampiire",
      //     "avatar": "https://avatars3.githubusercontent.com/u/25523682?v=4"
      //   },
      //   "voyage": {
      //     "id": "11",
      //     "title": "Halloween Voyage"
      //   }
      // },
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
          "worked_on": `Worked on creating forms for project-update. trying to style mockups for newsfeed`,
          "working_on": `Will work on coding the newsfeed and finish the project portal. need to finish new forms`,
          "blocked_on": `Figuring out how to hook up these forms without dynamic forms. `,
          "expiration": 1535692113990
        }
      },
      {
        "id": "MTF2b3lhZ2U=",
        "type": "GithubActivityIssue",
        "timestamp": 1535090610661,
        "user": {
          "id": "6",
          "username": "the-vampiire",
          "avatar": "https://avatars3.githubusercontent.com/u/25523682?v=4"
        },
        "repo": {
          "id": "MDEwOlJlcG9zaXRvcnkxNDQ0NTQ1MDQ=",
          "url": "https://github.com/the-vampiire/dynamic-forms",
          "repo_name": "the-vampiire/dynamic-forms",
        },
        "issue": {
          "user": {
            "username": "the-vampiire",
            "avatar": "https://avatars3.githubusercontent.com/u/25523682?v=4"
          },
          "status": "OPEN",
          "title": "Refactor/dynamic form structure",
          "url": "https://github.com/the-vampiire/dynamic-forms/pull/3",
          "timestamp": "2018-08-21T21:19:21Z"
        }
      },
      {
        "id": "MTF2b3lhZ2U=",
        "type": "GithubActivityPullRequest",
        "timestamp": 1535090610661,
        "user": {
          "id": "6",
          "username": "the-vampiire",
          "avatar": "https://avatars3.githubusercontent.com/u/25523682?v=4"
        },
        "repo": {
          "id": "MDEwOlJlcG9zaXRvcnkxNDQ0NTQ1MDQ=",
          "url": "https://github.com/the-vampiire/dynamic-forms",
          "repo_name": "the-vampiire/dynamic-forms",
        },
        "pull_requests": {
          "user": {
            "username": "the-vampiire",
            "avatar": "https://avatars3.githubusercontent.com/u/25523682?v=4"
          },
          "status": "OPEN",
          "title": "Refactor/dynamic form structure",
          "url": "https://github.com/the-vampiire/dynamic-forms/pull/3",
          "timestamp": "2018-08-21T21:19:21Z",
          "files_changed": 11
        }
      }
    ]
  }
}

class NewsFeed extends React.Component {
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

