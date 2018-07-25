import * as React from 'react';

function dateFormatter (timestamp) {
  let newDate = new Date(timestamp).toDateString().split(' ');
  newDate.shift();
  newDate.pop();
  return newDate.join(' ');
}
const Info = ({startDate, endDate}) => {
  return (
    <div className="card-info">
      <h2>8 Weeks</h2>
      <p>Build to Learn</p>
      <p>
        {dateFormatter(startDate) }  -  { dateFormatter(endDate)}
      </p>
    </div>
  )
}

export default Info;