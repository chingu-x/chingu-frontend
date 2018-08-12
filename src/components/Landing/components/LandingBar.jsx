import * as React from 'react';

export default ({ title, renderItems, data }) => (
  <div className="landing-bar" >
    <div className="landing-bar-title" >{ title }</div>
    <div className="landing-bar-items" >{ renderItems(data) }</div>
  </div>
);
