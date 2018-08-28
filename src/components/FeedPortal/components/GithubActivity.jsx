import * as React from "react";
import newsfeedDateFormatter from '../../utilities/newsfeedDateFormatter';
import './GithubActivity.css';

const PRIcon = () => {
  return (
    <img
      className="github-activity-icon"
      alt="pr-icon"
      src={require('../../../assets/github-PR-icon.png')}
    />
  )
}
const IssueIcon = () => {
  return (
    <img className="github-activity-icon" alt="issue-icon" src={require('../../../assets/github-issue-icon.png')} />
  )
}

export const GithubActivityPullRequest = ( data ) => {
  return (
    <a href={data.url} target="_blank" className="github-activity-container">
      <PRIcon />
      <div className="github-activity-text">
        <div className="github-activity-title">{data.title}</div>
        <div className="github-activity-subtitle">You review was requested {newsfeedDateFormatter(data.timestamp)} ago</div>
      </div>
    </a>
  )
}
export const GithubActivityIssue = ( data ) => {
  return (
    <a href={data.url} target="_blank" className="github-activity-container">
      <IssueIcon />
      <div className="github-activity-text">
        <div className="github-activity-title">{data.title}</div>
        <div className="github-activity-subtitle">You review was requested  {newsfeedDateFormatter(data.timestamp)} ago</div>
      </div>
    </a>
  )
}
