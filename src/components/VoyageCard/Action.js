import * as React from "react";
import { Link } from "react-router-dom"
import { client } from "../../index"
import { voyageActionSwitch } from "../utilities/switches"

/**
 * TODO:
 * 1. allow action to take in arguments
 * 2. add way to navigate to apply page
 **/

 /**
 * refactor notes 8/11/18
 * 
 * apply to voyage button ->
 * render VoyageApplicationContainer passing voyage_id
 * 
 * Flow
 *    status is  'voyage_ready' -> VoyageApplication query
 *      submitRedirect -> /profile
 *    status is 'profile_complete' -> NewVoyageUserApplication query
 *      submitRedirect -> /voyage/applicaton/${this.state.voyage_id}      
 *    status is 'profile_incomplete' -> Redirect /profile/update
 */
const Action = ({ routeId, userStatus, action }) => {
  const { to, query, variables } = voyageActionSwitch(userStatus, routeId)
  return (
    <div className="action-container">
      <Link 
        to={to} 
        className="action-button"
        onMouseOver={() => client.query({ query, variables })}
      >Apply</Link>
      <p className="action-warning">{action}</p>
    </div>
  );
};

export default Action;
