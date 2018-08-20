import { Redirect } from "react-router-dom"
import { client } from "../../index"
import dynamicFormQuery from "../DynamicForm/graphql/dynamicFormQuery"
import userBaseQuery from "../Header/userBaseQuery"
import formVersion from "./formVersion"
import voyagesQuery from "../VoyagePortal/graphql/voyagesQuery"

/**
 * Takes userStatus and routeId
 * Returns object containing info needed for VoyageCard Action button (route, query, variables)
 */
const voyageCardActionSwitch = (userStatus, routeId) => {
  console.log({ userStatus, routeId})
  switch (userStatus) {
    case "voyage_ready":
      return { to: `/voyage/application/${routeId}`, query: dynamicFormQuery, variables: { voyage_id: routeId, purpose: "voyage_application", version: null}}
    case "profile_complete":
      return { newUser: true, to: `/voyage/application/${routeId}`, query: dynamicFormQuery, variables: { voyage_id: routeId, purpose: "new_voyage_user", version: null}}
    case "profile_incomplete":
      return { to: "/profile/update" }
    default: 
      return { to: "/voyage", query: voyagesQuery }
  }
  }

const loginRedirectSwitch = {
  "new_user": "/register",
  "profile_incomplete": "/profile/update",
  "profile_complete": "/profile",
  "voyage_ready": "/profile"
}


// TODO: switch queries based on routes
const querySwitch = {}

export { voyageCardActionSwitch, loginRedirectSwitch, querySwitch }