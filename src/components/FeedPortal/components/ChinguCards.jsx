import * as React from "react";
import './ChinguCards.css';
import { Link } from "react-router-dom";
import newsfeedDateFormatter from '../../utilities/newsfeedDateFormatter';

const CardBody = (message, iconPath) => {
  return (
    <React.Fragment>
      <img
        className="newsfeed-chingu-card--icon"
        src={
          iconPath
            ? require(iconPath)
            : require('../../../assets/green alert.png')
        }
        alt="green"
      />
      <div className="newsfeed-voyage-text">
        {message}
      </div>
    </React.Fragment>
  )
}  

export const NewsfeedVoyage = ({ voyage: { id, title }, has_applied, ...rest}) => {
  const message = has_applied
    ? `Thanks for applying to ${title}! Check back later for status updates on your application`
    : `${title} Applications are open! Click here to apply.`;

  if(has_applied) {
    return (
      <div
        className="newsfeed-chingu-card--container chingu-card--green"
      >
        {CardBody(message)}
    </div>
    )
  } else {
    return (
      <Link
        to={`/voyage/application/${id}`}
        className="newsfeed-chingu-card--container chingu-card--green"
      >
        {CardBody(message)}
      </Link>
    )
  }
}
// TODO: styling
// color and icon?
export const NewsfeedAvailableStandup = ({ id, expiration }) => (
  <Link
    to={`/team/standup/${id}`}
    className="newsfeed-chingu-card--container chingu-card--purple"
  >
    {CardBody(`New Standup available. Expires in ${newsfeedDateFormatter(expiration, true)}`)}
  </Link>
);
