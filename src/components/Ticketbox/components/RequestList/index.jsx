import React from "react";
import { gql } from "apollo-boost";
import { Request } from "../../../utilities";
import Loader from "../../../Loader";
import BackBtn from "../BackBtn";
import HelpRequestCard from "./HelpRequestCard";

class RequestList extends React.Component {
  render() {
    const {
      data: { user },
      loading,
      switchRenderedType
    } = this.props;
    const imgFile = "Tickets-small.png";
    const imgSrc = require(`../../../../assets/${imgFile}`);

    let toRender;
    if (loading) toRender = <Loader size="small" />;
    else {
      const { help_requests } = user;
      if (!help_requests.length) {
        toRender =
          "No tickets yet! Come back after you have submitted a Bug, Suggestion or Help Ticket.";
      } else {
        toRender = help_requests.map(HelpRequestCard);
      }
    }
    // todo: if allow filter by status or request_type manage state of filter tabs
    // filter client side or move <Request /> query to be managed by RequestList

    return (
      <div className="bug-suggestion-box tickets-container">
        <div className={`box-color color--tickets`}>
          <img className="box-icon" alt="icon" src={imgSrc} />
        </div>
        {toRender}
        <BackBtn
          type="center"
          path={""}
          switchRenderedType={switchRenderedType}
        />
      </div>
    );
  }
}

const userRequestListQuery = gql`
  query userRequestListQuery(
    # todo: remove args if managing filtering client side
    $status: HelpRequestStatus
    $request_type: ProjectHelpRequestType
  ) {
    user {
      id
      # todo: remove args if managing filtering client side
      help_requests(status: $status, request_type: $request_type) {
        id
        status
        context
        created_at
        resolved_at
        admin_notes
        ... on HelpRequest {
          type: __typename
        }
        ... on ChangeProject {
          type: __typename
          requested_project {
            title
          }
        }
        ... on InactiveMember {
          type: __typename
          inactive_member {
            username
          }
          last_contact
        }
      }
    }
  }
`;

export default props => (
  <Request
    {...props}
    loader={false}
    query={userRequestListQuery}
    component={RequestList}
    options={{ fetchPolicy: "network-only" }}
  />
);
