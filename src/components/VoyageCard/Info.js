import * as React from 'react';

function dateFormatter (timestamp) {
  let newDate = new Date(timestamp).toDateString().split(' ');
  newDate.shift();
  newDate.pop();
  return newDate.join(' ');
}
const Info = ({startDate, endDate, title}) => {
  return (
    <div className="card-info">
      <div className="card-info--header">8 Weeks <br />Build to Learn</div>
      <div className="card-info--date">
        {dateFormatter(startDate) }  -  { dateFormatter(endDate)}
      </div>
    </div>
  )
}

export default Info;