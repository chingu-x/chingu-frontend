import * as React from "react";
import './ChinguCards.css';
import { Link } from "react-router-dom";

export const NewsfeedVoyage = ({ voyage }) => {
  return (
    <Link to="/voyage" className="newsfeed-chingu-card--container chingu-card--green">
      <img className="newsfeed-chingu-card--icon" src={require('../../../assets/green alert.png')} alt="green" />
      <div className="newsfeed-voyage-text">{voyage.title} {voyage.id} Applications are open! Click here to apply.</div>
    </Link>
  )
}
