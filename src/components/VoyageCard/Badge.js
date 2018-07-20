import * as React from 'react';

const Badge = ({ number }) => {
  return <div className="card-circle">
    <h2 className="card-number">
      {number}
      <span className="card-label">voyage</span>
    </h2>
  </div>
}

export default Badge;