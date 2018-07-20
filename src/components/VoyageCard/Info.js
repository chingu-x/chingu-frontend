import * as React from 'react';

const Info = ({startDate, endDate}) => {
  return (
    <div className="card-info">
      <h2>8 Weeks</h2>
      <p>Build to Learn</p>
      <p>
        {startDate} - {endDate}
      </p>
    </div>
  )
}

export default Info;