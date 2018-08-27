import * as React from "react";
import './NoNews.css';

const NoNews = () => {
  return (
    <div
      className="no-news-card--container"
    >
      <img
        className="no-news-card--icon"
        src={require('../../../assets/sad-face.png')}
        alt="sad"
      />
      <div className="no-news-text">
        No News Yet - Please Check Back Later!
      </div>
    </div>
  )
}

export default NoNews;