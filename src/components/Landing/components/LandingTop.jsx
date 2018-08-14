import * as React from 'react';
import { Link } from "react-router-dom";

export default ({ user }) => {
  // console.log('user: ', user); 
  return (
    <div className="landing-top" >
      <div className="tagline-box" >
        <div className="tagline" >Get out of tutorial purgatory. </div>
        <div className="tagline--subtext" >Learn how to be a team developer & boost your portfolio.</div>
        {user
          ? null
          : (
            <Link to="/login" >
              <button className="big-green-btn">Apply</button>
            </Link >
          )
        }
      </div>
      <img className="landing-img" src={require('../../../assets/landingImage.png')} alt="landingImage" />
    </div>
  );
}
