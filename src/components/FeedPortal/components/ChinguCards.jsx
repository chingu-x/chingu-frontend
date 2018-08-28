import * as React from "react";
import './ChinguCards.css';
import { Link } from "react-router-dom";

export const NewsfeedVoyage = ({ voyage: { id, title } }) => {
  return (
    <Link
      to={`/voyage/application/${id}`}
      className="newsfeed-chingu-card--container chingu-card--green"
    >
      <img
        className="newsfeed-chingu-card--icon"
        src={require('../../../assets/green alert.png')}
        alt="green"
      />
      <div className="newsfeed-voyage-text">
        {title} Applications are open! Click here to apply.
      </div>
    </Link>
  )
}
