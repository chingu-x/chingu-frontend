import * as React from 'react';
import { client } from "../../../index"
import voyagesQuery from "../../VoyagePortal/graphql/voyagesQuery"

export default props => (
  <div className="landing-top" >
    <div className="tagline-box" >
      {
        !props.authed &&
        <React.Fragment>

          <div className="tagline" >Get out of tutorial purgatory. </div>
          <div className="tagline--subtext" >Learn how to be a team developer & boost your portfolio.</div>
          <button
            className="big-green-btn"
            onClick={props.onApplyClick}
            // Prefetch /voyage route only on auth
            onMouseOver={() => localStorage.token && client.query({ query: voyagesQuery })}
          >
            Apply
      </button>
        </React.Fragment>
      }
    </div>
    <img className="landing-img" src={require('../../../assets/landingImage.png')} alt="landingImage" />
  </div >
)
