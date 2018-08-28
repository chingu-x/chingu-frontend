import * as React from "react";
import { Link } from "react-router-dom"
import { client } from "../../index"
import dynamicFormQuery from "../DynamicForm/dynamicFormQuery"
import voyagesQuery from "../VoyagePortal/graphql/voyagesQuery"

const voyageActionSwitch = (userStatus, routeParam) => {
  switch (userStatus) {
    case "voyage_ready":
      return { to: `/voyage/application/${routeParam}`, query: dynamicFormQuery, variables: { voyage_id: routeParam, purpose: "voyage_application", version: null}}
    case "profile_complete":
      return { to: `/voyage/application/${routeParam}`, query: dynamicFormQuery, variables: { voyage_id: routeParam, purpose: "new_voyage_user", version: null}}
    case "profile_incomplete":
      return { to: "/profile/update" }
    default: 
      return { to: "/voyage", query: voyagesQuery }
  }
  }

/**
 * NOTES
 * Uses switch based on user status to determine next route and prefetch query on hover
 * Uses the switch to determine the onClick route and onMouseOver query to prefetch based on userStatus and routeParams
 * 
 * TODO:
 * 1. allow action to take in arguments
 * 2. add way to navigate to apply page
 **/

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
