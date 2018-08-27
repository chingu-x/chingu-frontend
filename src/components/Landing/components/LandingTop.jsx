import * as React from 'react';
import { client } from "../../../index"
import voyagesQuery from "../../VoyagePortal/graphql/voyagesQuery"

export default props => (
  <div className="landing-top" >
    <div className="tagline-box" >
      <div className="tagline" >Get out of tutorial purgatory. </div>
      <div className="tagline--subtext" >Learn how to be a team developer & boost your portfolio.</div>
      {
        !props.authed &&
        <button
          className="big-green-btn"
          onClick={props.onApplyClick}
        >
          Apply
        </button>
      }
    </div>
    <img className="landing-img" src={require('../../../assets/landingImage.png')} alt="landingImage" />
  </div >
)
