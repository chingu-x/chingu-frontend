import * as React from 'react';

const Badge = ({ voyage: { id, title } }) => {
  return <div className="card-circle">
    <h2 className="card-number">
      {title.replace( /^\D+/g, '') || id}
      <span className="card-label">voyage</span>
    </h2>
  </div>
}

export default Badge;