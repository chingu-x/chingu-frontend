import * as React from 'react';
import { Link } from "react-router-dom";
import { client } from "../../../index"
import voyagesQuery from "../../../queries/voyagesQuery"
export default props => (
  <div className="landing-top" >
    <div className="tagline-box" >
      <div className="tagline" >Get out of tutorial purgatory. </div>
      <div className="tagline--subtext" >Learn how to be a team developer & boost your portfolio.</div>
      <button
        className="big-green-btn"
        onClick={props.onApplyClick}
        onMouseOver={() => client.query({ query: voyagesQuery })}
      >
        Apply
      </button>
    </div>
    <img className="landing-img" src={require('../../../assets/landingImage.png')} alt="landingImage" />
  </div >
)
