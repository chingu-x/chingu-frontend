import * as React from "react";
import newsfeedDateFormatter from '../../utilities/newsfeedDateFormatter';
import './GithubActivity.css';

const PRIcon = () => {
  return (
    <img className="github-activity-icon" alt="pr-icon" src={require('../../../assets/github-PR-icon.png')} />
  )
}
const IssueIcon = () => {
  return (
    <img className="github-activity-icon" alt="issue-icon" src={require('../../../assets/github-issue-icon.png')} />
  )
}

const GithubActivity = ({ githubActivity }) => {
  let data = githubActivity;
  let icon;
  let title;
  let url;
  switch (data.type) {
    case 'GithubActivityPullRequest':
      icon = <PRIcon />;
      title = data.pull_requests.title;
      url = data.pull_requests.url;
      break;
    case 'GithubActivityIssue':
      icon = <IssueIcon />;
      title = data.issue.title;
      url = data.issue.url;
      break;
    default:
      break;
  }
  return (
    <a href={url} target="_blank" className="github-activity-container">
      {icon}
      <div className="github-activity-text">
        <div className="github-activity-title">{title}</div>
        <div className="github-activity-subtitle">You review was requested {newsfeedDateFormatter(data.timestamp)} ago</div>
      </div>
    </a>
  )
}

export default GithubActivity;
