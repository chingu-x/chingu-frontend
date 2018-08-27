import * as React from 'react';

export default (
  { title, subtitle, renderItems, data }
) => (
  <div className="cohorts-bar" >
    <div className="cohorts-bar-title" >{ title }</div>
    {
      subtitle &&
        <div className="cohorts-bar-subtitle" >
          {subtitle[0]}
          {subtitle.length === 2 && <br/>}
          {subtitle.length === 2 && subtitle[1]}
        </div>
    }
    <div className="cohorts-bar-items" >{ renderItems(data) }</div>
  </div >
);
